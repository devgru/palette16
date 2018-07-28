import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import Tutorial from '../tutorial';
import TutorialColorSpaces from '../tutorial-color-spaces';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPaletteUrls } from '../../modules/paletteList';
import { modifyCurrentColor } from '../../modules/currentPalette';

import './index.css';

const codes = {
  KeyY: ['r', 1],
  KeyH: ['r', -1],
  KeyU: ['g', 1],
  KeyJ: ['g', -1],
  KeyI: ['b', 1],
  KeyK: ['b', -1],
};

class App extends Component {
  constructor(props) {
    super(props);

    this.props.loadPaletteUrls();

    window.addEventListener('keypress', ({ code }) => {
      const action = codes[code];
      if (action) {
        props.modifyCurrentColor(...action);
      }
    });
  }
  render() {
    return (
      <div className="App">
        <Route exact={true} path="/" component={Home} />
        <Route path="/palette" component={Home} />
        <Route exact={true} path="/tutorial" component={Tutorial} />
        <Route
          exact={true}
          path="/tutorial/color-spaces"
          component={TutorialColorSpaces}
        />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPaletteUrls, modifyCurrentColor }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(App);
