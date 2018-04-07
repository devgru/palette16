import closestColor from 'closest-color/src/match.js';
import hex2rgb from 'closest-color/src/hex2rgb.js';

const cache = {};
function closestColorName(c) {
  if (!cache[c]) {
    cache[c] = closestColor(hex2rgb(c)).name;
  }
  return cache[c];
}
export default closestColorName;
