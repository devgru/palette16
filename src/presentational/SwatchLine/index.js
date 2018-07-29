import React from 'react';
import Swatch from '../Swatch';

import './index.css';

const SwatchLine = ({ colors }) => (
  <div className="SwatchLine">
    {colors.map((color, i) => <Swatch key={i} color={color} />)}
  </div>
);

export default SwatchLine;
