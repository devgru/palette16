import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import currentPalette from './currentPalette'

export default combineReducers({
  router: routerReducer,
  currentPalette
})
