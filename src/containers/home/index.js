import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadBase16Palette } from '../../modules/currentPalette';

import SwatchLine from '../../presentational/SwatchLine';
import ColorSpace from '../../presentational/ColorSpace';
import ForceField from '../../presentational/ForceField';
import CodeExample from '../../presentational/CodeExample';
import Slots from '../../presentational/Slots';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateStyles();
  }

  componentDidUpdate() {
    this.updateStyles();
  }

  updateStyles() {
    const { style } = document.documentElement;
    const { all } = this.props;

    if (!all) {
      return;
    }

    all.forEach((color, i) => {
      style.setProperty('--color' + i, color);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loadPalette) {
      nextProps.loadBase16Palette(nextProps.loadPalette);
    }
  }

  render() {
    const { currentPalette, all } = this.props;
    if (!currentPalette || !all) {
      return null;
    }

    const { palette, forceField, slots } = currentPalette;

    if (!all) {
      return null;
    }

    return (
      <div className="Home">
        <SwatchLine colors={palette.base} textColors={palette.base} />
        <SwatchLine colors={palette.accents} textColors={palette.base} />
        <Slots colors={all} slots={slots} textColors={palette.base} />
        {forceField && <ForceField forceField={forceField} />}
        <ColorSpace colors={all} />
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

const mapStateToProps = ({ currentPalette, router, paletteList }) => {
  console.log('MSTP');
  const palette = router.location.pathname.slice('/palette/'.length);
  const paletteInfo = paletteList.paletteUrls[palette];
  if (!currentPalette.palette) {
    if (paletteInfo) {
      return { loadPalette: paletteInfo };
    } else {
      return {};
    }
  }

  if (paletteInfo.name !== currentPalette.palette.name) {
    return { loadPalette: paletteInfo };
  }

  const { base, accents } = currentPalette.palette;
  return {
    currentPalette,
    all: base.concat(accents),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBase16Palette }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
