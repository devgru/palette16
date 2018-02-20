import palettes from '../base16-palettes';
const initialState = {
  palettes: palettes,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const loadPaletteUrls = () => async dispatch => {};
