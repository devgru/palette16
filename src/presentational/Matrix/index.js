import React from 'react';

import './index.css';

export default ({ colors }) => (
  <div>
    {colors.map((bg, i) => (
      <div key={i} className="MatrixRow">
        {colors.map((fg, j) => (
          <div
            key={j}
            className="MatrixCell"
            style={{
              color: fg,
              background: bg,
            }}
          >
            A
          </div>
        ))}
      </div>
    ))}
  </div>
);
