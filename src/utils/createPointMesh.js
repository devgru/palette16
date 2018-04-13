import React from 'react';

import colorToVector3 from './colorToVector3';
import toHex from './toHex';

const cubeSpace = 4;
const cubeRatio = 2;
const pointSize = cubeSpace / cubeRatio;

export default function createPointMesh(color, a = 1, plane = null) {
  const colorHex = toHex(color);
  const position = colorToVector3(color);
  if (plane) {
    position.projectOnPlane(plane.normal);
  }

  return (
    <mesh key={`${colorHex}-${a}`} position={position}>
      <sphereGeometry radius={pointSize} />
      <meshBasicMaterial transparent opacity={a} color={colorHex} />
    </mesh>
  );
}
