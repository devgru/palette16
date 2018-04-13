import React from 'react';

import toHex from './toHex';
import { Matrix4, Vector3, Quaternion, Object3D } from 'three';

const getQuaternion = normal => {
  const rotationMatrix = new Matrix4();
  const zeroPoint = new Vector3();
  const quaternion = new Quaternion();

  rotationMatrix.lookAt(zeroPoint, normal, Object3D.DefaultUp);
  quaternion.setFromRotationMatrix(rotationMatrix);

  return quaternion;
};

export default function createPlaneMesh(plane) {
  const { centroid, normal, color } = plane;
  return (
    <line key="plane" position={centroid} quaternion={getQuaternion(normal)}>
      <circleGeometry radius={50} />
      <lineBasicMaterial color={toHex(color)} />
    </line>
  );
}
