import { Vector3 } from 'three';
import { lab } from 'd3-color';

function calcLabTarget(color) {
  const { l, a, b } = lab(color);
  return new Vector3(b, 2.0612 * (-50 + l), -a);
}

export default calcLabTarget;
