import yaml from 'js-yaml';
import {range} from 'd3-array';

export const PALETTE_LOADING_STARTED = 'currentPalette/PALETTE_LOADING_STARTED';
export const PALETTE_LOADED = 'currentPalette/PALETTE_LOADED';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case PALETTE_LOADED:
      const {palette} = action;
      return {
        ...state,
        palette
      };

    default:
      return state;
  }
};

export const loadPalette = url => async dispatch => {
  dispatch({
    type: PALETTE_LOADING_STARTED
  });

  const response = await fetch(url);
  const text = await response.text();
  const paletteFromYaml = yaml.safeLoad(text);

  const palette = range(0, 16).map(n =>
    paletteFromYaml['base0' + n.toString(16).toUpperCase()]
  );

  dispatch({
    type: PALETTE_LOADED,
    palette
  });
};