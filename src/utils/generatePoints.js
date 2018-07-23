import createPointMesh from './createPointMesh';
import { rgb } from 'd3-color';

const cubeItems = 5;
const colorStep = 255 / cubeItems;

export default function generatePoints() {
  const result = [];
  for (let r = 0; r <= 255; r += colorStep) {
    for (let g = 0; g <= 255; g += colorStep) {
      for (let b = 0; b <= 255; b += colorStep) {
        result.push(createPointMesh(rgb(r, g, b), 0.1));
      }
    }
  }

  return result;
}
