import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPaletteUrls } from '../../modules/paletteList';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.loadPaletteUrls();
  }
  render() {
    return (
      <div className="App">
        <Route path="/" component={Home} />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPaletteUrls }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
