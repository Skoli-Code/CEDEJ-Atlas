export CanvasTest from './canvas';
import leafletImage from 'leaflet-image';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, GeoJSON, LayerGroup, Pane, Circle } from 'react-leaflet';
import L from 'leaflet';

import * as d3 from 'd3';

import 'leaflet/dist/leaflet.css';
import './Atlas.css';

import CanvasLayer, { CanvasDelegate } from './canvas';
import { circleStyle } from './styles';

const BASE_LAYER_URL = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}.png';

const NATURAL_FEATURES_URL = 'http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}.png';

const NATURAL_FEATURES_ATTRIBUTION = '&copy; Powerded by <a href="http://www.esri.com/">ESRI</a> world reference overlay';

const canvas = L.canvas();

export default class Atlas extends Component {
  static propTypes = {
    data: PropTypes.object,
    print: PropTypes.bool,
    onRender: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultPropTypes = {
    print: false,
  }
  constructor(props){
    super(props);
    this.state = {
      mapRef:null,
    };
  }

  bindContainer(mapRef) {
    // if(mapRef){ this.setState({mapRef: mapRef.leafletElement}); }
    if (this.props.onRender) {
      this.map = this.map || mapRef.leafletElement;
      // TODO: replace by dispatch or props callback
      leafletImage(this.map, (err, canvas) => {
        if (err) {
          console.error(err);
          return;
        }
        const url = canvas.toDataURL();
        this.props.onRender(url);
      });
    }
  }

  render() {
    const { data } = this.props;
    // const { mapRef } = this.state;
    const position = [10, 35];
    return (
      <Map
				renderer={canvas}
        animate={true}
				center={position} zoom={4}
        ref={(ref) => this.bindContainer(ref)}
      >
          <TileLayer url={ BASE_LAYER_URL } />
          <TileLayer
            url={ NATURAL_FEATURES_URL }
            attribution={ NATURAL_FEATURES_ATTRIBUTION }/>
        
					<CanvasLayer zIndex={ 400 } delegate={ new CanvasDelegate(data) } />
      </Map>
    );
  }
}
