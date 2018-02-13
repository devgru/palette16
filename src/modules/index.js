import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import currentPalette from './currentPalette';
import paletteList from './paletteList';

export default combineReducers({
  router: routerReducer,
  currentPalette,
  paletteList,
});
