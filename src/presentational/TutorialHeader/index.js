import React from 'react';

import './index.css';

export default ({ children, hash }) => {
  const parts = window.location.hash.split('#');
  const page = parts[1];

  return (
    <h2 className="TutorialHeader">
      <a className="TutorialHeader-hash" href={'#' + page + '#' + hash}>
        #
      </a>
      <a id={hash}>{children}</a>
    </h2>
  );
};
