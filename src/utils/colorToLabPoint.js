import { Vector3 } from 'three';
import { lab } from 'd3-color';

export default function colorToLabPoint(color) {
  const { l, a, b } = lab(color);
  return new Vector3(b, 2.0612 * (-50 + l), -a);
}

/*
function calcLabTarget(color) {
  var lab = d3.lab(color);
  return new THREE.Vector3(
    lab.b,
    1.0306 * (-100 + 2 * lab.l),
    lab.a
  );
}

function calcHsvTarget(color, cone) {
  var hsl = d3.hsl(color);
  if (isNaN(hsl.h)) hsl.h = 0;

  var rgb = d3.rgb(color);
  var rgbArray = objectToArray(rgb);

  var M = d3.max(rgbArray);
  var m = d3.min(rgbArray);
  var C = (M - m) / 256;
  var S = M == 0 ? 0: 1 - m / M;

  var hsv = {
    h: hsl.h,
    s: cone ? C : S,
    v: M / 256
  };

  hsv.h -= 45;
  var rad = Math.PI * hsv.h / 180;
  return new THREE.Vector3(
    hsv.s * 97.15,
    -103 + 206 * hsv.v,
    0
  )
    .applyAxisAngle(axisY, rad);
}

function calcHslTarget(color, biCone) {
  var hsl = d3.hsl(color);
  if (isNaN(hsl.s)) hsl.s = 0;
  if (isNaN(hsl.h)) hsl.h = 0;
  hsl.h -= 45;
  var rad = Math.PI * hsl.h / 180;
  var cone = biCone ? 2 * (0.5 - Math.abs(hsl.l - 0.5)) : 1;
  return new THREE.Vector3(
    hsl.s * 97.15 * cone,
    -103 + 206 * hsl.l,
    0
  )
    .applyAxisAngle(axisY, rad);
}
function calcRgbTarget(color) {
  var rgb = d3.rgb(color);
  return new THREE.Vector3(
    rgbTransform(rgb.r),
    rgbTransform(rgb.g),
    rgbTransform(rgb.b)
  )
    .applyAxisAngle(axisX, angleX)
    .applyAxisAngle(axisZ, angleZ)
    .applyAxisAngle(axisY, angleY)

}

 */
