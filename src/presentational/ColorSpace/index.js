import React, { Component } from 'react';
import PropTypes from 'prop-types';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';
import { rgb } from 'd3-color';
import generatePoints from '../../utils/generatePoints';
import createPoint from '../../utils/createPoint';
import uniqBy from 'lodash.uniqby';

import './index.css';

class ColorSpace extends Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 500);

    this.state = {
      backgroundPoints: generatePoints(),
      renderScene: () => {},
    };
  }

  componentDidMount() {
    const Controls = OrbitControls(THREE);
    this.controls = new Controls(this.refs.camera, this.ref);

    const renderScene = () => this.state.renderScene();
    this.controls.addEventListener('start', renderScene);
    this.controls.addEventListener('end', renderScene);
    this.controls.addEventListener('change', renderScene);
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  onManualRenderTriggerCreated = renderScene => {
    this.setState({ renderScene });
    renderScene();
  };

  render() {
    const width = 200;
    const height = 200;
    const { backgroundPoints } = this.state;
    const { colors } = this.props;

    const palettePoints = colors.map(color => {
      const { r, g, b } = rgb(color);
      return createPoint(r, g, b);
    });

    const uniqPoints = uniqBy(palettePoints, a => a.key);

    return (
      <div className="ColorSpace" ref={ref => (this.ref = ref)}>
        <React3
          mainCamera="camera"
          width={width}
          height={height}
          clearColor={0xeeeeee}
          forceManualRender
          onManualRenderTriggerCreated={this.onManualRenderTriggerCreated}
        >
          <scene>
            <perspectiveCamera
              name="camera"
              ref="camera"
              fov={50}
              aspect={width / height}
              near={1}
              far={10000}
              position={this.cameraPosition}
            />
            {backgroundPoints}
            {uniqPoints}
          </scene>
        </React3>
      </div>
    );
  }
}

ColorSpace.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColorSpace;
