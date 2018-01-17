import yaml from 'js-yaml';
import {range} from 'd3-array';
import {rgb} from 'd3-color';
import {ratio} from 'get-contrast';

import delta from '../utils/delta';
import generateForceFieldLinks from '../utils/generateForceFieldLinks';
import runForceFieldSimulation from '../utils/runForceFieldSimulation';

export const PALETTE_LOADING_STARTED = 'currentPalette/PALETTE_LOADING_STARTED';
export const PALETTE_LOADED = 'currentPalette/PALETTE_LOADED';
export const FORCE_FIELD_UPDATED = 'currentPalette/FORCE_FIELD_UPDATED';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case PALETTE_LOADING_STARTED:
      return null;

    case PALETTE_LOADED:
      const {palette} = action;
      return {
        ...state,
        palette,
      };

    case FORCE_FIELD_UPDATED:
      const {nodes, links} = action;
      return {
        ...state,
        forceField: {
          nodes,
          links,
        }
      };

    default:
      return state;
  }
};

export const loadBase16Palette = url => async dispatch => {
  dispatch({
    type: PALETTE_LOADING_STARTED
  });

  const response = await fetch(url);
  const text = await response.text();
  const paletteFromYaml = yaml.safeLoad(text);

  const all = range(0, 16).map(n =>
    '#' + paletteFromYaml['base0' + n.toString(16).toUpperCase()]
  );

  const BASE_COLORS_COUNT = 8;
  const ACCENT_COLORS_COUNT = 8;
  const base = all.slice(0, BASE_COLORS_COUNT);
  const accents = all.slice(BASE_COLORS_COUNT, BASE_COLORS_COUNT + ACCENT_COLORS_COUNT);

  dispatch({
    type: PALETTE_LOADED,
    palette: {
      base,
      accents,
    },
  });

  // TODO separate force field simulation

  const nodes = all.map((color, id) => {
    const {r, g, b} = rgb(color);
    const x = b - r;
    const y = -r -g -b;
    return {color, id, r, g, b, x, y};
  });

  const links = generateForceFieldLinks(BASE_COLORS_COUNT, ACCENT_COLORS_COUNT);

  links.forEach((link) => {
    const sourceColor = all[link.source];
    const targetColor = all[link.target];
    link.distance = delta(sourceColor, targetColor);
    link.contrast = ratio(sourceColor, targetColor);
    if (link.contrast < 2) {
      console.log(link, '!!!');
    }
  });

  runForceFieldSimulation(nodes, links, ticked);

  function ticked() {
    dispatch({
      type: FORCE_FIELD_UPDATED,
      nodes,
      links
    });
  }
};
