import {getDeltaE00} from 'delta-e';
import {lab} from 'd3-color';

export default function delta(color, color2) {
  return getDeltaE00(toLab(color), toLab(color2));
}

function toLab(color) {
  const {l, a, b} = lab(color);
  return {
    L: l,
    A: a,
    B: b
  };
}