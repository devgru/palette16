export default function objectToArray(o) {
  return Object.keys(o).map(function(k) {
    return o[k];
  });
}
