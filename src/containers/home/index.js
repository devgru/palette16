import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addColor,
  addSlot,
  loadBase16Palette,
} from '../../modules/currentPalette';

import SwatchLine from '../../presentational/SwatchLine';
import ColorSpace from '../../presentational/ColorSpace';
import ForceField from '../../presentational/ForceField';
import CodeExample from '../../presentational/CodeExample';
import Slots from '../../presentational/Slots';

import './index.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadPalette(props);
  }
  componentDidMount() {
    this.updateStyles();
  }

  componentDidUpdate() {
    this.updateStyles();
  }

  componentWillReceiveProps(nextProps) {
    this.loadPalette(nextProps);
  }

  loadPalette (props) {
    if (props.loadPalette) {
      props.loadBase16Palette(props.loadPalette);
    }
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

  getBody() {
    const {
      currentPalette,
      all,
      accents,
      base,
      addColor,
      addSlot,
    } = this.props;

    if (!currentPalette || !all) {
      return <div className="Home-body" />;
    }

    const { slots, forceField } = currentPalette;

    if (!all) {
      return <div className="Home-body" />;
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
      <div className="Home-body">
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

  render() {
    const { palettes } = this.props;

    return (
      <div className="Home">
        {this.getBody()}
        <div className="Home-side">
          <h2>Palettes</h2>
          <ul>
            {Object.keys(palettes).map(name => (
              <li key={name}>
                <Link to={'/palette/' + name}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
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

const mapStateToProps = ({ router, paletteList, currentPalette }) => {
  const paletteKey = router.location.pathname.slice('/palette/'.length);
  const palettes = paletteList.palettes;
  const paletteInfo = palettes[paletteKey];
  if (!paletteInfo) {
    return {
      palettes,
    };
  }

  if (!currentPalette.slots) {
    return {
      palettes,
      loadPalette: paletteKey,
    }
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
    palettes,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addColor, addSlot, loadBase16Palette }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
