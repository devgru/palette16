import { range } from 'd3-array';
import { rgb } from 'd3-color';
import { ratio } from 'get-contrast';

import delta from '../utils/delta';
import generateForceFieldLinks from '../utils/generateForceFieldLinks';
import runForceFieldSimulation from '../utils/runForceFieldSimulation';

import fetchYaml from '../utils/fetchYaml';

export const PALETTE_LOADING_STARTED = 'currentPalette/PALETTE_LOADING_STARTED';
export const PALETTE_LOADED = 'currentPalette/PALETTE_LOADED';
export const FORCE_FIELD_UPDATED = 'currentPalette/FORCE_FIELD_UPDATED';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case PALETTE_LOADING_STARTED:
      return null;

    case PALETTE_LOADED:
      const { palette } = action;
      return {
        ...state,
        palette,
        slots: [
          {
            role: 'background',
            indices: [0, 1, 2, 3],
          },
          {
            role: 'foreground',
            indices: [4, 5, 6, 7],
          },
          {
            role: 'accent',
            indices: [8],
          },
          {
            role: 'accent',
            indices: [9],
          },
          {
            role: 'accent',
            indices: [10],
          },
          {
            role: 'accent',
            indices: [11],
          },
          {
            role: 'accent',
            indices: [12],
          },
          {
            role: 'accent',
            indices: [13],
          },
          {
            role: 'accent',
            indices: [14],
          },
          {
            role: 'accent',
            indices: [15],
          },
        ],
      };

    case FORCE_FIELD_UPDATED:
      const { nodes, links } = action;
      return {
        ...state,
        forceField: {
          nodes,
          links,
        },
      };

    default:
      return state;
  }
};

export const loadBase16Palette = url => async dispatch => {
  dispatch({
    type: PALETTE_LOADING_STARTED,
  });

  const palette = await fetchYaml(url);

  const all = range(0, 16).map(
    n => '#' + palette['base0' + n.toString(16).toUpperCase()]
  );

  const BASE_COLORS_COUNT = 8;
  const ACCENT_COLORS_COUNT = 8;
  const base = all.slice(0, BASE_COLORS_COUNT);
  const accents = all.slice(
    BASE_COLORS_COUNT,
    BASE_COLORS_COUNT + ACCENT_COLORS_COUNT
  );

  dispatch({
    type: PALETTE_LOADED,
    palette: {
      base,
      accents,
    },
  });

  // TODO separate force field simulation

  const nodes = all.map((color, id) => {
    const { r, g, b } = rgb(color);
    const x = b - r;
    const y = -r - g - b;
    return { color, id, r, g, b, x, y };
  });

  const links = generateForceFieldLinks(BASE_COLORS_COUNT, ACCENT_COLORS_COUNT);

  links.forEach(link => {
    const sourceColor = all[link.source];
    const targetColor = all[link.target];
    link.distance = delta(sourceColor, targetColor);
    console.log(sourceColor, targetColor, all);
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
      links,
    });
  }
};
