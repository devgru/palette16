import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Download from 'js-file-download';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  addColor,
  addSlot,
  loadBase16Palette,
  loadCustomPalette,
} from '../../modules/currentPalette';

import SwatchLine from '../../presentational/SwatchLine';
import HueCircle from '../../presentational/HueCircle';
import ColorSpace from '../../presentational/ColorSpace';
import ForceField from '../../presentational/ForceField';
import CodeExample from '../../presentational/CodeExample';
import Slots from '../../presentational/Slots';

import fitPlane from '../../utils/fitPlane';

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

  onDrop = ([file]) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const string = reader.result;
      const object = JSON.parse(string);
      this.props.loadCustomPalette(object);
      this.props.history.push(`/palette/${object.name}`);
    };

    reader.readAsBinaryString(file);
  };

  loadPalette(props) {
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

    const plane = fitPlane(accents);

    if (!currentPalette || !all) {
      return (
        <Dropzone
          className="Home-body"
          onDrop={this.onDrop}
          style={{}}
          disableClick
        />
      );
    }

    const { slots, forceField } = currentPalette;

    if (!all) {
      return (
        <Dropzone
          className="Home-body"
          onDrop={this.onDrop}
          style={{}}
          disableClick
        />
      );
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
      <Dropzone
        className="Home-body"
        onDrop={this.onDrop}
        style={{}}
        disableClick
      >
        <SwatchLine colors={base} uiContext={uiContext} />
        <SwatchLine colors={accents} uiContext={uiContext} />
        <HueCircle colors={accents} uiContext={uiContext} />
        <Slots
          colors={all}
          slots={slots}
          uiContext={uiContext}
          addColor={addColor}
          addSlot={addSlot}
        />
        {forceField && <ForceField forceField={forceField} />}
        <ColorSpace colors={all} accents={accents} plane={plane} />
        <CodeExample colors={all} />
      </Dropzone>
    );
  }

  save() {
    Download(
      JSON.stringify(this.props.currentPalette, null, 2),
      'palette.json',
      'application/json'
    );
  }

  render() {
    const { palettes } = this.props;

    return (
      <div className="Home">
        {this.getBody()}
        <div className="Home-side">
          <h2>Current palette</h2>
          <ul>
            <li onClick={() => this.save()}>Save</li>
          </ul>
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
  if (!currentPalette) {
    return {
      palettes,
    };
  }

  if (!currentPalette.slots || currentPalette.name !== paletteKey) {
    return {
      palettes,
      loadPalette: paletteKey,
    };
  }

  const base = [];
  const accents = [];
  currentPalette.slots.forEach(slot => {
    if (slot.role === 'accent') {
      accents.push(...slot.colors);
    } else {
      base.push(...slot.colors);
    }
  });

  const all = base.concat(accents);

  return {
    currentPalette,
    all,
    accents,
    base,
    palettes,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addColor, addSlot, loadBase16Palette, loadCustomPalette },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
