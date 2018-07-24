import { Vector3 } from 'three';
import { rgb } from 'd3-color';

const axisX = new Vector3(1, 0, 0);
const axisY = new Vector3(0, 1, 0);
const axisZ = new Vector3(0, 0, 1);
const angleX = -Math.PI / 4;
const angleY = -Math.PI / 4;
const angleZ = Math.atan(1 / Math.sqrt(2));

function rgbTransform(x) {
  return 0.466 * x - 59.5;
}
export default function colorToRgbPoint(color) {
  const { r, g, b } = rgb(color);
  return new Vector3(rgbTransform(r), rgbTransform(g), rgbTransform(b))
    .applyAxisAngle(axisX, angleX)
    .applyAxisAngle(axisZ, angleZ)
    .applyAxisAngle(axisY, angleY);
}
