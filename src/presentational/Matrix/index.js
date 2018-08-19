import React from 'react';

import './index.css';

const A = () => 'A';

export default ({ colors, fn = A }) => (
  <div className="Matrix">
    {colors.map((bg, y) => (
      <div key={y} className="MatrixRow">
        {colors.map((fg, x) => (
          <div
            key={x}
            className="MatrixCell"
            style={{
              color: fg,
              background: bg,
            }}
          >
            {fn(colors[x], colors[y])}
          </div>
        ))}
      </div>
    ))}
  </div>
);
