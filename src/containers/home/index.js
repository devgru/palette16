import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  loadBase16Palette,
  addColor,
  addSlot,
} from '../../modules/currentPalette';

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
    const { base } = this.props;

    if (!base) {
      return;
    }

    base.forEach((color, i) => {
      style.setProperty('--color' + i, color);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loadPalette) {
      nextProps.loadBase16Palette(nextProps.loadPalette);
    }
  }

  render() {
    const {
      currentPalette,
      all,
      accents,
      base,
      addColor,
      addSlot,
    } = this.props;
    if (!currentPalette || !all) {
      return null;
    }

    const { slots, forceField } = currentPalette;

    if (!all) {
      return null;
    }

    const background = slots[0].colors[0];
    const foreground = slots[1].colors[3];
    const textColors = [background, foreground];

    const uiContext = {
      textColors,
      background,
      foreground,
    };

    return (
      <div className="Home">
        <SwatchLine colors={accents} uiContext={uiContext} />
        <SwatchLine colors={base} uiContext={uiContext} />
        <Slots
          colors={all}
          slots={slots}
          uiContext={uiContext}
          addColor={addColor}
          addSlot={addSlot}
        />
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
  const palette = router.location.pathname.slice('/palette/'.length);
  const paletteInfo = paletteList.paletteUrls[palette];
  if (!currentPalette.name) {
    if (paletteInfo) {
      return { loadPalette: paletteInfo };
    } else {
      return {};
    }
  }

  if (paletteInfo.name !== currentPalette.name) {
    return { loadPalette: paletteInfo };
  }

  const all = [];
  const base = [];
  const accents = [];
  currentPalette.slots.forEach(slot => {
    if (slot.role === 'accent') {
      accents.push(...slot.colors);
    } else {
      base.push(...slot.colors);
    }
  });

  return {
    currentPalette,
    all,
    accents,
    base,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBase16Palette, addColor, addSlot }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
