// noinspection JSSuspiciousNameCombination
// Like squircle, but rectangular.
const Rectircle = (width, height = width) => {
  const size = Math.min(width, height);

  const c = size / 60;

  const hCenter = width / 2;
  const vCenter = height / 2;
  const hDiff = (width - size) / 2;
  const vDiff = (height - size) / 2;

  //    a  h
  // b        g
  //
  // c        f
  //    d  e

  return [
    `M ${hCenter - hDiff},0`, // a
    `C ${c},0 0,${c} 0,${vCenter - vDiff}`, // b
    `L 0,${vCenter + vDiff}`, // c
    `C 0,${height - c} ${c},${height} ${hCenter - hDiff},${height}`, // d
    `L ${hCenter + hDiff},${height}`, // e
    `C ${width - c},${height} ${width},${height - c} ${width},${vCenter +
      vDiff}`, // f
    `L ${width},${vCenter - vDiff}`, // g
    `C ${width},${c} ${width - c},0 ${hCenter + hDiff},0`, // h
    'Z',
  ].join(' ');
};

export default Rectircle;
