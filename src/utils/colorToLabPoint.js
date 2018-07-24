import { Vector3 } from 'three';
import { lab } from 'd3-color';

export default function colorToLabPoint(color) {
  const { l, a, b } = lab(color);
  return new Vector3(b, 2.0612 * (-50 + l), -a);
}

/*
function calcLabTarget(color) {
  var lab = d3.lab(color);
  return new Vector3(
    lab.b,
    1.0306 * (-100 + 2 * lab.l),
    lab.a
  );
}

function calcHslTarget(color, biCone) {
  var hsl = d3.hsl(color);
  if (isNaN(hsl.s)) hsl.s = 0;
  if (isNaN(hsl.h)) hsl.h = 0;
  hsl.h -= 45;
  var rad = Math.PI * hsl.h / 180;
  var cone = biCone ? 2 * (0.5 - Math.abs(hsl.l - 0.5)) : 1;
  return new Vector3(
    hsl.s * 97.15 * cone,
    -103 + 206 * hsl.l,
    0
  )
    .applyAxisAngle(axisY, rad);
}

 */
