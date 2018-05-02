import React from 'react';
import objectMap from 'object-map';
import { rgb, hcl } from 'd3-color';
import closestColorName from '../../utils/closestColorName';

import './index.css';

const RED_HUE = 20;
const BLUE_HUE = 306.28;

function lightness(color) {
  const L = color.l;

  return L < 5
    ? 'very dark'
    : L < 35 ? 'dark' : L > 95 ? 'very bright' : L > 65 ? 'bright' : undefined;
}

function chromatic(color) {
  const C = color.c;

  return C === '0' ? 'monochrome' : C < 10 ? 'almost achromatic' : undefined;
}

function temperature(color) {
  const H = color.h;
  const C = color.c;

  return C === '0'
    ? undefined
    : H < RED_HUE || H > BLUE_HUE
      ? 'non-spectral'
      : H < 143.95 ? 'warm' : 'cold';
}

function propertyOf(color) {
  return property => property(color);
}

const properties = [lightness, chromatic, temperature];

const Swatch = ({ background, color }) => {
  const name = closestColorName(background);

  const hclColor = objectMap(hcl(background), Math.round);
  const rgbColor = rgb(background);

  if (hclColor.c === 0) hclColor.h = 'any';

  const description = properties
    .map(propertyOf(hclColor))
    .filter(Boolean)
    .join(', ');

  const { r, g, b } = rgbColor;
  const { h, c, l } = hclColor;

  return (
    <div
      className="Swatch"
      style={{
        background,
        color,
      }}
    >
      <div className="SwatchProperties">{name}</div>
      <div className="SwatchProperties">{description}</div>
      <div className="SwatchProperties">{background.toUpperCase()}</div>
      <div className="SwatchProperties">
        R: {r}, G: {g}, B: {b}
      </div>
      <div className="SwatchProperties">
        H: {h}, C: {c}, L: {l}
      </div>
    </div>
  );
};

export default Swatch;
