import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const DomaCareTitles = 'https://tile.domacare.fi/osm_tiles/{z}/{x}/{y}.png';
const osmAttr = '&copy; Domacare and OpenStreetMap</a> contributors';
const mapCenter = [60.195012, 24.899475];
const zoomLevel = 13;

export default class DomacareMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 60.195012,
      lng: 24.899475,
      zoom: 13,
    };
  }


  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={mapCenter} zoom={zoomLevel} style={{height: "100vh", width:"100%"}}>
        <TileLayer
          attribution={osmAttr}
          url={DomaCareTitles}
        />
        <Marker position={mapCenter}>
          <Popup>
            <span>
              Elina start driving now!
            </span>
          </Popup>
        </Marker>
      </Map>
    )
  }
}
