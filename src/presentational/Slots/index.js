import React from 'react';
import { max } from 'd3-array';

import rectircle from '../../utils/rectircle';
import farthestOf from '../../utils/farthestOf';

import './index.css';

const SIZE = 60;

const X_STEP = SIZE / 6;
const Y_STEP = SIZE / 12;
const WIDTH = SIZE + X_STEP * 2;
const HEIGHT = SIZE + Y_STEP * 2;

const PLUS_DY = 18;
const COLOR_DY = 28;

const Slots = ({ colors, slots, addColor, addSlot, uiContext }) => {
  const { textColors, foreground } = uiContext;

  const maxSlots = max(slots, ({ colors }) => colors.length);
  const H_SLOTS_COUNT = slots.length + 1;
  const V_SLOTS_COUNT = maxSlots + 1;

  const dashStep = 9;
  const dash = `${dashStep},${dashStep}`;
  return (
    <div>
      <svg width={WIDTH * H_SLOTS_COUNT} height={HEIGHT * V_SLOTS_COUNT}>
        {slots.map((slot, i) => {
          const slotsCount = slot.colors.length;
          const height =
            (SIZE * maxSlots + (maxSlots - slotsCount) * Y_STEP * 2) /
            slotsCount;
          return (
            <g key={i} transform={`translate(${i * WIDTH})`}>
              {slot.colors.map((color, j) => {
                return (
                  <g
                    key={j}
                    transform={`translate(${X_STEP}, ${Y_STEP +
                      j * (height + Y_STEP * 2)})`}
                    className="Slot"
                  >
                    <path
                      d={rectircle(SIZE, height)}
                      fill={color}
                      stroke={foreground}
                    />
                    <text
                      fill={farthestOf(color, textColors)}
                      x={SIZE / 2}
                      y={COLOR_DY}
                      textAnchor="middle"
                    >
                      {color.slice(1)}
                    </text>
                  </g>
                );
              })}
              <g
                transform={`translate(${X_STEP}, ${Y_STEP +
                  maxSlots * HEIGHT})`}
                className="Slot SlotPlaceholder"
                onClick={() => addColor(i, slot.colors[0])}
              >
                <path
                  d={rectircle(SIZE)}
                  stroke={foreground}
                  strokeDasharray={dash}
                  fill="transparent"
                />
                <text
                  textAnchor="middle"
                  x={SIZE / 2}
                  y={SIZE / 2}
                  dy={PLUS_DY}
                  fontSize={60}
                >
                  +
                </text>
              </g>
            </g>
          );
        })}
        <g
          transform={`translate(${slots.length * WIDTH + X_STEP}, ${Y_STEP})`}
          className="Slot SlotPlaceholder"
          onClick={() => addSlot('#ff0000')}
        >
          <path
            d={rectircle(SIZE, maxSlots * HEIGHT)}
            stroke={foreground}
            strokeDasharray={dash}
            fill="transparent"
          />
          <text
            textAnchor="middle"
            x={SIZE / 2}
            y={maxSlots * HEIGHT / 2}
            dy={PLUS_DY}
            fontSize={60}
          >
            +
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Slots;
