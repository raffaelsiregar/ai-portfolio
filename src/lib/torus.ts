export type Point3D = readonly [number, number, number];
export type TorusRotation = { pitch: number; yaw: number };

export const initialTorusRotation: TorusRotation = { pitch: 0.85, yaw: 0 };

export const torusRings: Point3D[][] = Array.from(
  { length: 74 },
  (_, index) => {
    const u = (index / 74) * Math.PI * 2;
    return Array.from({ length: 65 }, (_, j): Point3D => {
      const v = (j / 64) * Math.PI * 2;
      const radius = 130 + 48 * Math.cos(v);
      return [radius * Math.cos(u), radius * Math.sin(u), 48 * Math.sin(v)];
    });
  },
);

// Rotate the original 3D vertices around the origin before projecting to SVG.
// The fixed roll keeps the original composition; the pivot stays at (250, 250).
export function projectTorus(rotation: TorusRotation): string[] {
  const cp = Math.cos(rotation.pitch);
  const sp = Math.sin(rotation.pitch);
  const cy = Math.cos(rotation.yaw);
  const sy = Math.sin(rotation.yaw);
  const cr = Math.cos(-0.56);
  const sr = Math.sin(-0.56);
  return torusRings.map((ring) =>
    ring
      .map(([x, y, z]) => {
        const py = y * cp - z * sp;
        const pz = y * sp + z * cp;
        const px = x * cy + pz * sy;
        const depth = -x * sy + pz * cy;
        const scale = 700 / (700 - depth);
        return `${(250 + (px * cr - py * sr) * scale).toFixed(2)},${(250 + (px * sr + py * cr) * scale).toFixed(2)}`;
      })
      .join(" "),
  );
}
