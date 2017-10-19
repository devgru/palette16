import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  loadPalette
} from '../../modules/currentPalette';

import Swatch from '../../presentational/swatch';

class Home extends Component {
  constructor(props) {
    super(props);

    this.props.loadPalette(
      'https://raw.githubusercontent.com/Defman21/base16-materia-scheme/master/materia.yaml'
    );
  }

  render() {
    const { currentPalette } = this.props;
    if (!currentPalette) {
      return null;
    }
    const { palette } = currentPalette;
    console.log('palette', palette);
    return <div>
      {palette.map((color, i) =>
        <Swatch
          key={i}
          color={color}
        />
      )}
    </div>;
  }
}

const mapStateToProps = ({ currentPalette }) => ({
  currentPalette
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadPalette
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
