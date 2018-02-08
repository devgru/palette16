import React from 'react';
import {max} from 'd3-array';

import farthestOf from '../../utils/farthestOf';

const SIZE = 100;
const CENTER = SIZE / 2;
const STEP = SIZE / 10;

const X_STEP = SIZE / 10;
const Y_STEP = SIZE / 25;
const WIDTH = SIZE + X_STEP * 2;
const HEIGHT = SIZE + Y_STEP * 2;
const SQUIRCLE_D = `M ${CENTER},0 C ${STEP},0 0,${STEP} 0,${CENTER} 0,${SIZE - STEP} ${STEP},${SIZE} ${CENTER},${SIZE} ${SIZE - STEP},${SIZE} ${SIZE},${SIZE - STEP} ${SIZE},${CENTER} ${SIZE},${STEP} ${SIZE - STEP},0 ${CENTER},0 Z`;

const Slots = ({ colors, slots, textColors }) => (
  <svg
    className="SlotsLine"
    style={{
      clear: 'both',
    }}
    width={WIDTH * slots.length}
    height={HEIGHT * max(slots, ({indices}) => indices.length)}
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
        transform={`translate(${i * WIDTH})`}
      >
        {slot.indices.map((colorIndex, j) =>
          <use
            key={colorIndex}
            transform={`translate(${X_STEP}, ${Y_STEP + j * HEIGHT})`}
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
