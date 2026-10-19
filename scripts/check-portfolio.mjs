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
  "In development": ["stock-research-copilot", "praisenow"],
  Upcoming: ["easyquot", "onlinepo", "pocketrav"],
};
assert.equal(projects.length, 10);
assert.equal(new Set(projects.map((project) => project.id)).size, 10);
for (const [status, ids] of Object.entries(expected)) {
  assert.deepEqual(projects.filter((project) => project.status === status).map((project) => project.id).sort(), ids.sort());
}
for (const project of projects) {
  if (project.status !== "Upcoming") {
    assert.ok(project.image && existsSync(`public${project.image}`), `${project.name}: screenshot missing`);
    assert.ok(project.captureNote, `${project.name}: screenshot context missing`);
  }
  assert.equal(Boolean(project.url), project.status === "Released", `${project.name}: release link does not match status`);
  if (project.url) assert.equal(new URL(project.url).protocol, "https:");
}
assert.ok(existsSync(`public${profile.photo}`));
console.log("Portfolio verified: 10 projects, 5 released, 2 in development, 3 upcoming, 7 screenshots, and profile photo.");
