import {lab} from 'd3-color';
import {mean} from 'd3-array';
import {svd} from 'numeric';

export default function fitPlane(accents) {
  if (!accents) {
    return;
  }
  const labs = accents.map(z => {
    const {l, a, b} = lab(z);
    return [l, a, b];
  });
  const centroid = [
    mean(labs, z => z[0]),
    mean(labs, z => z[1]),
    mean(labs, z => z[2])
  ];
  const relative = labs.map(([l, a, b]) => [
    l - centroid[0],
    a - centroid[1],
    b - centroid[2],
  ]);
  const normal = svd(relative).V[2];

  return {
    centroid,
    normal,
  };
}
