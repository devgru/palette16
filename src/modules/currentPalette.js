import { range } from 'd3-array';
import { rgb } from 'd3-color';
import { ratio } from 'get-contrast';

import delta from '../utils/delta';
import generateForceFieldLinks from '../utils/generateForceFieldLinks';
import runForceFieldSimulation from '../utils/runForceFieldSimulation';

export const PALETTE_LOADING_STARTED = 'currentPalette/PALETTE_LOADING_STARTED';
export const PALETTE_LOADED = 'currentPalette/PALETTE_LOADED';
export const FORCE_FIELD_UPDATED = 'currentPalette/FORCE_FIELD_UPDATED';
export const ADD_COLOR = 'currentPalette/ADD_COLOR';
export const SELECT_COLOR = 'currentPalette/SELECT_COLOR';
export const ADD_SLOT = 'currentPalette/ADD_SLOT';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLOR:
      return {
        ...state,
        slots: state.slots.map((slot, index) => {
          if (index !== action.slotIndex) {
            return slot;
          }
          return {
            ...slot,
            colors: [...slot.colors, action.color],
          };
        }),
      };

    case ADD_SLOT:
      return {
        ...state,
        slots: [
          ...state.slots,
          {
            role: 'accent',
            colors: [action.color],
          },
        ],
      };

    case SELECT_COLOR:
      return {
        ...state,
        selectedColor: action.selectedColor,
      };

    case PALETTE_LOADING_STARTED:
      return {};

    case PALETTE_LOADED:
      const { name, slots } = action;

      return {
        ...state,
        name,
        slots,
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

export const addColor = (slotIndex, color) => dispatch => {
  dispatch({
    type: ADD_COLOR,
    slotIndex,
    color,
  });
};

export const addSlot = color => dispatch => {
  dispatch({
    type: ADD_SLOT,
    color,
  });
};
const BASE_COLORS_COUNT = 8;
const ACCENT_COLORS_COUNT = 8;

export const buildSlotsFromPalette = function(palette) {
  const all = range(0, 16).map(
    n => '#' + palette['base0' + n.toString(16).toUpperCase()]
  );

  const base = all.slice(0, BASE_COLORS_COUNT);
  const accents = all.slice(
    BASE_COLORS_COUNT,
    BASE_COLORS_COUNT + ACCENT_COLORS_COUNT
  );

  const slots = [];

  slots.push({
    role: 'background',
    colors: base.slice(0, 4),
  });

  slots.push({
    role: 'foreground',
    colors: base.slice(4, 8),
  });

  accents.forEach(a =>
    slots.push({
      role: 'accent',
      colors: [a],
    })
  );
  return { all, slots };
};
export const loadBase16Palette = paletteKey => async (dispatch, getState) => {
  dispatch({
    type: PALETTE_LOADING_STARTED,
  });
  const name = paletteKey;

  const palette = getState().paletteList.palettes[paletteKey];
  if (!palette) return;

  const { all, slots } = buildSlotsFromPalette(palette);

  dispatch({
    type: PALETTE_LOADED,
    name,
    slots,
  });

  return;

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
export const loadCustomPalette = palette => dispatch => {
  dispatch({
    type: PALETTE_LOADED,
    ...palette,
  });
};
export const selectColor = selectedColor => dispatch => {
  dispatch({
    type: SELECT_COLOR,
    selectedColor,
  });
};
