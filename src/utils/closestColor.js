import closestColor from 'closest-color/src/match.js';
import hex2rgb from 'closest-color/src/hex2rgb.js';

function closest(c) {
  return closestColor(hex2rgb(c)).name;
}
export default closest;
