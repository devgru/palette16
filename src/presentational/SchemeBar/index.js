import React from 'react';

import './index.css';

const SchemeBlock = ({ id, scheme, loadScheme }) => (
  <div
    className="SchemeBlock"
    style={{
      background: '#' + scheme.base00,
      color: '#' + scheme.base07,
    }}
    onClick={() => loadScheme(id)}
  >
    {id}
  </div>
);

export default ({ schemes, loadScheme }) => (
  <div className="SchemeBar">
    {Object.keys(schemes).map(key => (
      <SchemeBlock
        key={key}
        id={key}
        scheme={schemes[key]}
        loadScheme={loadScheme}
      />
    ))}
  </div>
);
