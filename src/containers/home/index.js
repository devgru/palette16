import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadBase16Palette} from '../../modules/currentPalette';

import './index.css';

import SwatchLine from '../../presentational/SwatchLine';
import ColorSpace from '../../presentational/ColorSpace';
import ForceField from '../../presentational/ForceField';
import CodeExample from '../../presentational/CodeExample';

class Home extends Component {
  constructor(props) {
    super(props);

    this.props.loadBase16Palette(
      'https://raw.githubusercontent.com/chriskempson/base16-unclaimed-schemes/master/solarized-light.yaml'
    );
  }

  componentDidMount() {
    this.updateStyles();
  }

  componentDidUpdate() {
    this.updateStyles();
  }

  updateStyles() {
    const {style} = document.documentElement;
    const {all} = this.props;

    if (!all) {
      return;
    }

    all.forEach((color, i) => {
      style.setProperty('--color' + i, color);
    });
  }

  render() {
    const {currentPalette, all} = this.props;
    if (!currentPalette || !all) {
      return null;
    }

    const {
      palette,
      forceField,
    } = currentPalette;

    if (!all) {
      return null;
    }

    return (
      <div className="Home">
        <SwatchLine colors={palette.base} />
        <SwatchLine colors={palette.accents} />
        <ColorSpace colors={all} />
        {forceField && <ForceField forceField={forceField} />}
        <CodeExample colors={all} />
      </div>
    );
  }
}

Home.propTypes = {
  all: PropTypes.arrayOf(PropTypes.string),
  currentPalette: PropTypes.shape({
    palette: PropTypes.shape({
      base: PropTypes.arrayOf(PropTypes.string),
      accents: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

const mapStateToProps = ({currentPalette}) => {
  if (!currentPalette) {
    return {};
  }

  const { base, accents } = currentPalette.palette;
  return {
    currentPalette,
    all: base.concat(accents)
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  loadBase16Palette
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
