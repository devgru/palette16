import React from 'react';
import './index.css';

const InlineSwatch = ({ color }) => (
  <span
    className="InlineSwatch"
    style={{
      background: color,
    }}
  />
);

export default InlineSwatch;
