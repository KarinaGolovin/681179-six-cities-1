import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';

const Map = (props) => {
  const {city, placesList} = props;
  const cityCoordinates = city;
  const mapZoom = 12;
  const offersCords = placesList.map((place) => {
    return place.coordinates;
  });
  // const offerCords = [52.3709553943508, 4.89309666406198];
  const map = L.map(`map`, {
    center: cityCoordinates,
    zoom: mapZoom,
    zoomControl: false,
    marker: true,
    layers: [
      L
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        }),
    ]
  });
  const mapIcon = L.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  });

  map.setView(cityCoordinates, mapZoom);

  // L
  //   .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
  //     attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
  //   })
  // .addTo(map);

  offersCords.map((offerCords) => {
    return L
      .marker(offerCords, {mapIcon})
      .addTo(map);
  });

  return (
    <div id="map"></div>
  );
};

Map.propTypes = {
  city: PropTypes.array.isRequired,
  placesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
