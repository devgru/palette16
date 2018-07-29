import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

export default ({ colors, children, language }) => {
  const style = {
    hljs: {
      display: 'block',
      overflowX: 'auto',
      padding: '0em',
      background: colors[0],
      color: colors[6],
    },
    'hljs-comment': {
      color: colors[4],
    },
    'hljs-quote': {
      color: colors[4],
    },
    'hljs-keyword': {
      color: colors[11],
    },
    'hljs-selector-tag': {
      color: colors[11],
    },
    'hljs-addition': {
      color: colors[11],
    },
    'hljs-number': {
      color: colors[12],
    },
    'hljs-string': {
      color: colors[12],
    },
    'hljs-meta .hljs-meta-string': {
      color: colors[12],
    },
    'hljs-literal': {
      color: colors[12],
    },
    'hljs-doctag': {
      color: colors[12],
    },
    'hljs-regexp': {
      color: colors[12],
    },
    'hljs-title': {
      color: colors[13],
    },
    'hljs-section': {
      color: colors[13],
    },
    'hljs-name': {
      color: colors[13],
    },
    'hljs-selector-id': {
      color: colors[13],
    },
    'hljs-selector-class': {
      color: colors[13],
    },
    'hljs-attribute': {
      color: colors[10],
    },
    'hljs-attr': {
      color: colors[10],
    },
    'hljs-variable': {
      color: colors[10],
    },
    'hljs-template-variable': {
      color: colors[10],
    },
    'hljs-class .hljs-title': {
      color: colors[10],
    },
    'hljs-type': {
      color: colors[10],
    },
    'hljs-symbol': {
      color: colors[9],
    },
    'hljs-bullet': {
      color: colors[9],
    },
    'hljs-subst': {
      color: colors[9],
    },
    'hljs-meta': {
      color: colors[9],
    },
    'hljs-meta .hljs-keyword': {
      color: colors[9],
    },
    'hljs-selector-attr': {
      color: colors[9],
    },
    'hljs-selector-pseudo': {
      color: colors[9],
    },
    'hljs-link': {
      color: colors[9],
    },
    'hljs-built_in': {
      color: colors[8],
    },
    'hljs-deletion': {
      color: colors[8],
    },
    'hljs-formula': {
      background: colors[1],
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
  };

  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      showLineNumbers={true}
      lineNumberContainerStyle={{
        background: colors[1],
        color: colors[2],
        float: 'left',
        paddingLeft: '10px',
        paddingRight: '5px',
      }}
      lineNumberStyle={{
        background: colors[1],
        float: 'right',
        clear: 'both',
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
};
