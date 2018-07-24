import createPointMesh from './createPointMesh';
import { rgb } from 'd3-color';

export default function generatePoints(colorToPoint, steps, opacity) {
  const result = [];
  const gridStep = 255 / steps;
  for (let r = 0; r <= 255; r += gridStep) {
    for (let g = 0; g <= 255; g += gridStep) {
      for (let b = 0; b <= 255; b += gridStep) {
        result.push(createPointMesh(colorToPoint, rgb(r, g, b), opacity));
      }
    }
  }

  return result;
}
