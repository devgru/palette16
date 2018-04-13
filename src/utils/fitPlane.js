import { Vector3 } from 'three';
import { svd } from 'numeric';
import { lab } from 'd3-color';
import colorToVector3 from './colorToVector3';
import meanObject from './meanObject';

export default function fitPlane(accents) {
  if (!accents) {
    return;
  }

  const labs = accents.map(color => lab(color));
  const { l, a, b } = meanObject(['l', 'a', 'b'], labs);
  const color = lab(l, a, b);

  const colorPoints = accents.map(colorToVector3);
  const centroidObject = meanObject(['x', 'y', 'z'], colorPoints);
  const centroid = new Vector3(
    centroidObject.x,
    centroidObject.y,
    centroidObject.z
  );
  const relativePoints = colorPoints.map(({ x, y, z }) => [
    x - centroid.x,
    y - centroid.y,
    z - centroid.z,
  ]);

  // using SVD is suggested here https://math.stackexchange.com/a/99317
  // they suggest using 3 × N matrix, but numeric library supports only N × 3
  // so instead of U (left singular vector) we refer to V (right one)
  const { V } = svd(relativePoints);
  const normal = new Vector3(...V.map(([_a, _b, c]) => c));

  return {
    centroid,
    normal,
    color,
  };
}
