import React from 'react';

export default ({ children }) => (
  <div>
    <div className="Tutorial-page Tutorial-page_inverse_open" />
    <div className="Tutorial-page Tutorial-page_inverse">{children}</div>
    <div className="Tutorial-page Tutorial-page_inverse_close" />
  </div>
);
