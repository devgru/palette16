import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ForceField extends Component {
  render() {
    const {forceField} = this.props;
    const {links, nodes} = forceField;

    const points = nodes.map(({color, id, x, y}) =>
      <circle cx={x} cy={y} fill={color} r={5} key={id} />
    );

    const lines = links.map(({source, target}, i) =>
      <line
        stroke="black"
        x1={source.x}
        x2={target.x}
        y1={source.y}
        y2={target.y}
        key={i}
        strokeWidth={0.25}
      />
    );

    return (<svg width={200} height={200}>
      {lines}
      {points}
    </svg>);
  }
}

ForceField.propTypes = {
  forceField: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      color: PropTypes.string
    })),
    links: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.shape({}),
      target: PropTypes.shape({})
    })),
  }).isRequired
};

export default ForceField;
