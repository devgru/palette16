import React from 'react';

const Tick = ({ tick, r, size }) => (
  <path
    strokeWidth={0.25}
    d={`M0,${-r - size}L0,${-r + size}`}
    transform={`rotate(${tick})`}
  />
);

export default Tick;
