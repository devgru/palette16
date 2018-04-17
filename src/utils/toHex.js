import { rgb } from 'd3-color';
import rgb2hex from 'closest-color/src/rgb2hex';

export default function toHex(color) {
  const { r, g, b } = rgb(color);
  const fit = v => Math.max(0, Math.min(255, Math.round(v)));
  return rgb2hex({ R: fit(r), G: fit(g), B: fit(b) });
}
