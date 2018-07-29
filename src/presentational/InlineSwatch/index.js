import React from 'react';
import Swatch from '../Swatch';
import './index.css';

const InlineSwatch = ({ color }, { base }) => {
  return (
    <span
      className="InlineSwatch"
      style={{
        background: color,
      }}
    >
      {JSON.stringify(base)}
      <span className="InlineSwatch-hover">
        <Swatch color={color} />
      </span>
    </span>
  );
};

export default InlineSwatch;
