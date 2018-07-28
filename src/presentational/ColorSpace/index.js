import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sensor from 'react-visibility-sensor';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';
import { rgb } from 'd3-color';
import uniqBy from 'lodash.uniqby';

import generatePoints from '../../utils/generatePoints';
import createPlaneMesh from '../../utils/createPlaneMesh';
import createPointMesh from '../../utils/createPointMesh';
import colorToLabPoint from '../../utils/colorToLabPoint';

class ColorSpace extends Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 500);

    const colorToPoint = props.colorToPoint || colorToLabPoint;
    const gridOpacity = props.gridOpacity || 0.1;
    const gridSteps = props.gridSteps || 5;
    const gridPoints = generatePoints(colorToPoint, gridSteps, gridOpacity);
    this.state = {
      colorToPoint,
      gridPoints,
      renderScene: () => {},
    };
  }

  componentDidMount() {
    const Controls = OrbitControls(THREE);
    this.controls = new Controls(this.refs.camera, this.ref);
    const { controlsOptions = {}, animate } = this.props;
    Object.keys(controlsOptions).forEach(key => {
      this.controls[key] = controlsOptions[key];
    });

    const renderScene = () => {
      this.state.renderScene();
    };
    this.controls.addEventListener('start', renderScene);
    this.controls.addEventListener('end', renderScene);
    this.controls.addEventListener('change', renderScene);
  }

  animate() {
    if (!this.isVisible) {
      return;
    }
    if (this.controls) {
      this.controls.update();
    }
    requestAnimationFrame(() => this.animate());
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  onManualRenderTriggerCreated = renderScene => {
    this.setState({ renderScene });
    renderScene();
  };

  componentDidUpdate() {
    this.state.renderScene();
  }

  render() {
    const { gridPoints } = this.state;
    const { colors, plane, accents = [], width, height, animate } = this.props;

    const palettePoints = colors.map(color =>
      createPointMesh(this.state.colorToPoint, rgb(color), 1)
    );
    const projectedPoints = accents.map(color =>
      createPointMesh(this.state.colorToPoint, rgb(color), 0.7, plane)
    );
    const uniqPoints = uniqBy(palettePoints, a => a.key);
    const uniqProjectedPoints = uniqBy(projectedPoints, a => a.key);

    const onVisibilityChange = isVisible => {
      this.isVisible = isVisible;
      this.animate();
    };

    const react3 = (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        clearColor={colors[0]}
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
          {createPlaneMesh(plane, 'red')}
          {gridPoints}
          {uniqPoints}
          {uniqProjectedPoints}
        </scene>
      </React3>
    );

    const wrapped = animate ? (
      <Sensor onChange={onVisibilityChange} partialVisibility>
        {react3}
      </Sensor>
    ) : (
      react3
    );

    return (
      <div
        className="ColorSpace"
        ref={ref => (this.ref = ref)}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {wrapped}
      </div>
    );
  }
}

ColorSpace.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColorSpace;
