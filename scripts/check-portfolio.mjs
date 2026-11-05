import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

const compiled = ts.transpileModule(readFileSync("src/lib/portfolio.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { projects, profile } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

const expected = {
  Released: ["ezscan", "worshipnow", "gbi-bkp-bcp", "mfd-usage-report", "rns-salescrm"],
  "In development": ["stock-research-copilot", "praisenow", "agclub", "ai-video-editor", "ai-clipper"],
  Upcoming: ["easyquot", "onlinepo", "pocketrav"],
};
assert.equal(projects.length, 13);
assert.equal(new Set(projects.map((project) => project.id)).size, 13);
for (const [status, ids] of Object.entries(expected)) {
  assert.deepEqual(projects.filter((project) => project.status === status).map((project) => project.id).sort(), ids.sort());
}
for (const project of projects) {
  if (project.status !== "Upcoming") {
    assert.ok(project.image && existsSync(`public${project.image}`), `${project.name}: preview missing`);
    assert.ok(project.captureNote, `${project.name}: preview context missing`);
  }
  assert.equal(Boolean(project.url), project.status === "Released", `${project.name}: release link does not match status`);
  if (project.url) assert.equal(new URL(project.url).protocol, "https:");
}
for (const id of ["ai-video-editor", "ai-clipper"]) {
  const project = projects.find((item) => item.id === id);
  assert.equal(project.status, "In development");
  assert.ok(project.imageAlt, `${project.name}: output preview needs descriptive alt text`);
  assert.equal(project.imageFit, "contain", `${project.name}: preview should stay uncropped`);
}
assert.ok(existsSync(`public${profile.photo}`));
assert.equal(profile.email, "raffaelnathanielsiregar@gmail.com");
assert.equal(profile.whatsapp, "https://wa.me/6287884440256");
assert.equal(profile.linkedin, "https://www.linkedin.com/in/raffaelnathanielsiregar/");
console.log("Portfolio verified: 13 projects, 5 released, 5 in development, 3 upcoming, 10 local project previews, and profile photo.");
