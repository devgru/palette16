import React  from 'react';
import Swatch from '../Swatch';
import farthestOf from '../../utils/farthestOf';

import './index.css';

const SwatchLine = ({ colors, textColors }) => (
  <div className="SwatchLine">
    {colors.map((background, i) =>
      <Swatch
        key={i}
        background={background}
        color={farthestOf(background, textColors)}
      />
    )}
  </div>
);

export default SwatchLine;
