import React from 'react';
import {Map} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = () => {
    return (
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 55,
          latitude: 25,
          zoom: 5
        }}
        style={{ width: '100%', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
    );
  };
  
  export default MapView;