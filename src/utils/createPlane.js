import React from 'react';

import calcLabTarget from './calcLabTarget';
import toHex from './toHex';

const cubeSpace = 4;
const cubeRatio = 2;
const pointSize = cubeSpace / cubeRatio;

export default function createPlane(color, a = 1) {
  const colorHex = toHex(color);
  const position = calcLabTarget(color);

  return (
    <mesh key={`${colorHex}-${a}`} position={position}>
      <sphereGeometry radius={pointSize} />
      <meshBasicMaterial transparent opacity={a} color={colorHex} />
    </mesh>
  );
}
