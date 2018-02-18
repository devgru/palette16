import React from 'react';
import Swatch from '../Swatch';
import farthestOf from '../../utils/farthestOf';

import './index.css';

const SwatchLine = ({ colors, uiContext }) => (
  <div className="SwatchLine">
    {colors.map((background, i) => (
      <Swatch
        key={i}
        background={background}
        color={farthestOf(background, uiContext.textColors)}
      />
    ))}
  </div>
);

export default SwatchLine;
