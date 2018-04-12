import {lab} from 'd3-color';
import {mean} from 'd3-array';
import {svd} from 'numeric';
import calcLabTarget from './calcLabTarget';

export default function fitPlane(accents) {
  if (!accents) {
    return;
  }
  const labs = accents.map(color => {
    const {x, y, z} = calcLabTarget(color);
    return [x, y, z];
  });
  const centroid = [
    mean(labs, z => z[0]),
    mean(labs, z => z[1]),
    mean(labs, z => z[2])
  ];
  const relative = labs.map(([x, y, z]) => [
    x - centroid[0],
    y - centroid[1],
    z - centroid[2],
  ]);
  const wtf = svd(relative);
  const normal = [
    wtf.V[0][2],
    wtf.V[1][2],
    wtf.V[2][2],
  ];

  return {
    centroid,
    normal,
  };
}
