import delta from './delta';
import maxBy from 'lodash.maxby';

export default function farthestOf(color, colors) {
  return maxBy(colors, c => delta(c, color));
}
