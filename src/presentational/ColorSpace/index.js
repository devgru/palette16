import React, {Component} from 'react';
import PropTypes from 'prop-types';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';
import {rgb, lab} from 'd3-color';
import uniqBy from 'lodash.uniqby';

import generatePoints from '../../utils/generatePoints';
import createPoint from '../../utils/createPoint';
import calcLabTarget from '../../utils/calcLabTarget';
import toHex from '../../utils/toHex';

import './index.css';

class ColorSpace extends Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 500);

    this.state = {
      backgroundPoints: generatePoints(),
      renderScene: () => {
      }
    };
  }

  componentDidMount() {
    const Controls = OrbitControls(THREE);
    this.controls = new Controls(this.refs.camera, this.ref);

    const renderScene = ({target}) => {
      this.state.renderScene();
    };
    this.controls.addEventListener('start', renderScene);
    this.controls.addEventListener('end', renderScene);
    this.controls.addEventListener('change', renderScene);
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  onManualRenderTriggerCreated = renderScene => {
    this.setState({renderScene});
    renderScene();
  };

  componentDidUpdate() {
    this.state.renderScene();
  }

  render() {
    const width = 200;
    const height = 200;
    const {backgroundPoints} = this.state;
    const {colors, plane} = this.props;

    const palettePoints = colors.map(color => createPoint(rgb(color)));

    const {centroid, normal} = plane;
    const planeCentroidColor = lab(...centroid);

    const m1 = new THREE.Matrix4();
    const position = new THREE.Vector3(...centroid);
    const fakePosition = new THREE.Vector3();
    const n2 = new THREE.Vector3(...normal);
    m1.lookAt(fakePosition, n2, new THREE.Vector3(0, 1, 0));
    const quaternion = new THREE.Quaternion();
    quaternion.setFromRotationMatrix(m1);
    console.log(n2, m1, quaternion);

    const uniqPoints = uniqBy(palettePoints, a => a.key);
    console.log('ZZZ', plane);

    return (
      <div className="ColorSpace" ref={ref => (this.ref = ref)}>
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
            <line
              key="circle"
              quaternion={quaternion}
              position={position}
            >
              <circleGeometry radius={50} />
              <lineBasicMaterial
                color={toHex(planeCentroidColor)}
              />
            </line>
            {backgroundPoints}
            {uniqPoints}
          </scene>
        </React3>
      </div>
    );
  }
}

ColorSpace.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ColorSpace;
