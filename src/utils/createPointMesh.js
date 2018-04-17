import React from 'react';

import colorToVector3 from './colorToVector3';
import toHex from './toHex';

const cubeSpace = 4;
const cubeRatio = 2;
const pointSize = cubeSpace / cubeRatio;

const projectToPlane = (point, plane) => {
  const { centroid, normal } = plane;
  point.sub(
    normal.clone().multiplyScalar(
      normal.dot(
        point.clone().sub(
          centroid
        )
      )
    )
  );
};

export default function createPointMesh(color, a = 1, plane = null) {
  const colorHex = toHex(color);
  const point = colorToVector3(color);
  if (plane) {
    projectToPlane(point, plane);
  }

  return (
    <mesh key={`${colorHex}-${a}`} position={point}>
      <sphereGeometry radius={pointSize} />
      <meshBasicMaterial transparent opacity={a} color={colorHex} />
    </mesh>
  );
}
