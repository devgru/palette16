import { mean } from 'd3-array';

export default function meanObject(keys, objects) {
  return keys.reduce(
    (hash, key) => ({ ...hash, [key]: mean(objects, o => o[key]) }),
    {}
  );
}
