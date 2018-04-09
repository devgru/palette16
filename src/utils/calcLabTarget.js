import { Vector3 } from 'three';
import { lab } from 'd3-color';

function calcLabTarget(color) {
  const { l, a, b } = lab(color);
  return new Vector3(b, 1.0306 * (-100 + 2 * l), -a);
}

export default calcLabTarget;
