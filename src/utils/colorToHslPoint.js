import { Vector3 } from 'three';
import { hsl } from 'd3-color';

const axisY = new Vector3(0, 1, 0);

export default function calcHslTarget(color, biCone = true) {
  let { h, s, l } = hsl(color);
  if (isNaN(s)) s = 0;
  if (isNaN(h)) h = 0;
  h -= 45;
  const rad = Math.PI * h / 180;
  const cone = biCone ? 2 * (0.5 - Math.abs(l - 0.5)) : 1;
  return new Vector3(s * 97.15 * cone, -103 + 206 * l, 0).applyAxisAngle(
    axisY,
    rad
  );
}
