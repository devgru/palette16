import React  from 'react';
import objectMap from 'object-map';
import {rgb, hcl} from 'd3-color';
import round from 'round-to-precision';
import closestColor from '../../utils/closestColor';

import './index.css';

const cents = round(0.01);

const RED_HUE = 20;
const BLUE_HUE = 306.28;

function lightness(color) {
  const L = color.l;

  return L < 5 ? 'very dark'
    : L < 35 ? 'dark'
    : L > 95 ? 'very bright'
    : L > 65 ? 'bright'
    : undefined;
}

function chromatic(color) {
  const C = color.c;

  return C === 0 ? 'achromatic' : C < 10 ? 'almost achromatic' : 'chromatic';
}

function temperature(color) {
  const H = color.h;
  const C = color.c;

  return C === 0 || H < RED_HUE || H > BLUE_HUE ? undefined : H < 143.95 ? 'warm' : 'cold';
}

function propertyOf(color) {
  return property => property(color)
}

const properties = [
  lightness,
  chromatic,
  temperature
];

const Swatch = ({ background, color }) => {
  const name = closestColor(background);

  const hclC = hcl(background);
  const rgbC = rgb(background);

  const prettyHcl = objectMap(hclC, cents);
  const prettyRgb = objectMap(rgbC, cents);
  if (prettyHcl.c === 0) prettyHcl.h = 'any';

  const description = properties.map(propertyOf(prettyHcl)).filter(Boolean).join(', ');

  return (
    <div className="Swatch" style={{
      background,
      color,
    }}>
      <div className="SwatchProperties">
        {name}
      </div>
      <div className="SwatchProperties">
        {description}
      </div>
      <div className="SwatchProperties">
        {background.toUpperCase()}
      </div>
      <div className="SwatchProperties">
        R: {prettyRgb.r}, G: {prettyRgb.g}, B: {prettyRgb.b}
      </div>
      <div className="SwatchProperties">
        H: {prettyHcl.h}, C: {prettyHcl.c}, L: {prettyHcl.l}
      </div>
    </div>
  );
};

export default Swatch;
