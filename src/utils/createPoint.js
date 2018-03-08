import React from 'react';
import * as THREE from 'three';
import { rgb, lab } from 'd3-color';

const cubeSpace = 4;
const cubeRatio = 2;
const pointSize = cubeSpace / cubeRatio;
const R = 256 * 256;
const G = 256;
const B = 1;

function calcLabTarget(color) {
  const { l, a, b } = lab(color);
  return new THREE.Vector3(b, 1.0306 * (-100 + 2 * l), -a);
}

function numberToHex(i) {
  const pad = '000000';
  const s = i.toString(16);
  return '#' + pad.substring(0, pad.length - s.length) + s;
}

export default function createPoint(r, g, b, a = 1) {
  const colorNumber = r * R + g * G + b * B;
  const color = numberToHex(colorNumber);

  const position = calcLabTarget(rgb(color));

  return (
    <mesh key={`${colorNumber} ${a}`} position={position}>
      <sphereGeometry radius={pointSize} />
      <meshBasicMaterial transparent opacity={a} color={color} />
    </mesh>
  );
}
