import React from 'react';

import InlineSwatch from '../InlineSwatch';
import delta from '../../utils/delta';

import './index.css';

export default ({ c1, c2 }) => (
  <span className="Delta">
    ΔE(<InlineSwatch color={c1} />, <InlineSwatch color={c2} />) ={' '}
    {Math.round(delta(c1, c2))}
  </span>
);
