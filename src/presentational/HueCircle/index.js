import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hcl } from 'd3-color';
import { range } from 'd3-array';
import Tick from './Tick';

import './index.css';

const BIG_TICK_SIZE = 4;
const TICK_SIZE = 2;
const CIRCLE_RADIUS = 3;
const TICKS = range(0, 360, 15);
const BIG_TICKS = range(0, 360, 90);
const size = 200;
const mid = size / 2;
const r = size / 3;

class HueCircle extends Component {
  render() {
    const { colors, uiContext } = this.props;

    return (
      <div className="HueCircle">
        <svg width={size} height={size}>
          <g
            transform={`translate(${mid},${mid})`}
            stroke={uiContext.foreground}
          >
            <circle fill="none" strokeWidth={0.25} r={r} />
            {BIG_TICKS.map((tick, i) => (
              <Tick key={i} tick={tick} r={r} size={BIG_TICK_SIZE} />
            ))}
            {TICKS.map((tick, i) => (
              <Tick key={i} tick={tick} r={r} size={TICK_SIZE} />
            ))}
            {colors.map((color, i) => {
              const h = hcl(color).h;
              return (
                <circle
                  key={i}
                  r={CIRCLE_RADIUS}
                  fill={color}
                  cy={-r}
                  transform={`rotate(${h})`}
                  stroke="none"
                />
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
}

HueCircle.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HueCircle;
