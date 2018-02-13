import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
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
    const { palettes } = this.props;
    return (
      <div className="App">
        <ul className="App-side">
          {Object.keys(palettes).map(name => (
            <li key={name}>
              <Link to={'/palette/' + name}>{name}</Link>
            </li>
          ))}
        </ul>
        <Route path="/palette/" component={Home} />
      </div>
    );
  }
}

const mapStateToProps = ({ paletteList }) => ({
  palettes: paletteList.paletteUrls,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPaletteUrls }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
