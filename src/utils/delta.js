import { getDeltaE00 } from 'delta-e';
import { lab } from 'd3-color';

const cache = {};

export default function delta(c1, c2) {
  const key = c1 + c2;
  if (!cache[key]) {
    cache[key] = cache[c2 + c1] = getDeltaE00(toLab(c1), toLab(c2));
  }
  return cache[key];
}

function toLab(color) {
  const { l, a, b } = lab(color);
  return {
    L: l,
    A: a,
    B: b,
  };
}
