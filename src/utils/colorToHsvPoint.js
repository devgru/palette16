import { Vector3 } from 'three';
import { hsl, rgb } from 'd3-color';
import { min, max } from 'd3-array';
import objectToArray from './objectToArray';

const axisY = new Vector3(0, 1, 0);

export default function colorToHsvPoint(color, cone = false) {
  let { h } = hsl(color);
  if (isNaN(h)) h = 0;

  const rgbArray = objectToArray(rgb(color)).slice(0, 3);

  const M = max(rgbArray);
  const m = min(rgbArray);
  const C = (M - m) / 256;
  const S = M === 0 ? 0 : 1 - m / M;
  const hsv = {
    h,
    s: cone ? C : S,
    v: M / 256,
  };

  hsv.h -= 45;
  const rad = Math.PI * hsv.h / 180;
  return new Vector3(hsv.s * 97.15, -103 + 206 * hsv.v, 0).applyAxisAngle(
    axisY,
    rad
  );
}
