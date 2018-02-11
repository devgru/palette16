import React from 'react';
import {max} from 'd3-array';

import farthestOf from '../../utils/farthestOf';
import rectircle from '../../utils/rectircle';

const SIZE = 72;

const X_STEP = SIZE / 10;
const Y_STEP = SIZE / 25;
const WIDTH = SIZE + X_STEP * 2;
const HEIGHT = SIZE + Y_STEP * 2;

const Slots = ({ colors, slots, textColors }) => {
  const maxSlots = max(slots, ({indices}) => indices.length);
  return (
    <svg
      className="SlotsLine"
      style={{
        clear: 'both',
      }}
      width={WIDTH * slots.length}
      height={HEIGHT * maxSlots}
    >
      {slots.map((slot, i) =>
        <g
          key={i}
          transform={`translate(${i * WIDTH})`}
        >
          {slot.indices.map((colorIndex, j) => {
            const slotsCount = slot.indices.length;
            const height = SIZE * maxSlots / slotsCount + (maxSlots - slotsCount) * Y_STEP * 2;
            return (
              <path
                key={colorIndex}
                transform={`translate(${X_STEP}, ${Y_STEP + j * HEIGHT})`}
                d={rectircle(SIZE, height)}
                fill={colors[colorIndex]}
                stroke={farthestOf(colors[colorIndex], textColors)}
              />
            );
          })}
        </g>
      )}
    </svg>
  )
};

export default Slots;
