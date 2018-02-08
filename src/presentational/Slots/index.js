import React from 'react';
import {max} from 'd3-array';

import farthestOf from '../../utils/farthestOf';

const SIZE = 100;
const CENTER = SIZE / 2;
const STEP = SIZE / 10;
const FULL_SIZE = SIZE + STEP * 2;
const SQUIRCLE_D = `M ${CENTER},0 C ${STEP},0 0,${STEP} 0,${CENTER} 0,${SIZE - STEP} ${STEP},${SIZE} ${CENTER},${SIZE} ${SIZE - STEP},${SIZE} ${SIZE},${SIZE - STEP} ${SIZE},${CENTER} ${SIZE},${STEP} ${SIZE - STEP},0 ${CENTER},0 Z`;

const Slots = ({ colors, slots, textColors }) => (
  <svg
    className="SlotsLine"
    style={{
      clear: 'both',
    }}
    width={FULL_SIZE * slots.length}
    height={FULL_SIZE * max(slots, ({indices}) => indices.length)}
  >
    <defs>
      <path
        id="squircle"
        d={SQUIRCLE_D}
      />
    </defs>
    {slots.map((slot, i) =>
      <g
        key={i}
        transform={`translate(${i * FULL_SIZE})`}
      >
        {slot.indices.map((colorIndex, j) =>
          <use
            key={colorIndex}
            transform={`translate(${STEP}, ${STEP + j * FULL_SIZE})`}
            xlinkHref="#squircle"
            fill={colors[colorIndex]}
            stroke={farthestOf(colors[colorIndex], textColors)}
          />
        )}
      </g>
    )}
  </svg>
);

export default Slots;
