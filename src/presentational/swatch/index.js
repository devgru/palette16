import React  from 'react';

const Swatch = ({ color }) => <div style={{
  display: 'inline-block',
  width: '100px',
  height: '100px',
  background: '#' + color
}} />;

export default Swatch;