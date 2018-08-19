import React from 'react';
import PropTypes from 'prop-types';
import objectMap from 'object-map';
import { rgb, hcl } from 'd3-color';
import closestColorName from '../../utils/closestColorName';

import './index.css';
import farthestOf from '../../utils/farthestOf';

const RED_HUE = 20;
const BLUE_HUE = 306.28;

function lightness(color) {
  const L = color.l;

  return L < 5
    ? 'very dark'
    : L < 35 ? 'dark' : L > 95 ? 'very bright' : L > 65 ? 'bright' : undefined;
}

function chromaticity({ c }) {
  return c === 0 ? 'monochrome' : c < 10 ? 'almost achromatic' : undefined;
}

function temperature({ h, c }) {
  return c === 0
    ? undefined
    : h < RED_HUE || h > BLUE_HUE
      ? 'line of purples'
      : h < 143.95 ? 'warm' : 'cold';
}

function propertyOf(color) {
  return property => property(color);
}

const properties = [lightness, chromaticity, temperature];

const Swatch = ({ color }, { base }) => {
  const textColors = [base[0], base[base.length - 1]];
  const textColor = farthestOf(color, textColors);
  const name = closestColorName(color);
  const hclColor = objectMap(hcl(color), Math.round);
  const rgbColor = rgb(color);

  if (hclColor.c === 0) hclColor.h = 'any';

  const description = properties
    .map(propertyOf(hclColor))
    .filter(Boolean)
    .join(', ');

  const { r, g, b } = rgbColor;
  const { h, c, l } = hclColor;

  return (
    <span
      className="Swatch"
      style={{
        background: color,
        color: textColor,
      }}
    >
      <span className="SwatchProperties">{name}</span>
      <span className="SwatchProperties">{description}</span>
      <span className="SwatchProperties">{color.toUpperCase()}</span>
      <span className="SwatchProperties">
        R: {r}, G: {g}, B: {b}
      </span>
      <span className="SwatchProperties">
        H: {h}, C: {c}, L: {l}
      </span>
    </span>
  );
};

Swatch.contextTypes = {
  base: PropTypes.arrayOf(PropTypes.string),
};

export default Swatch;
