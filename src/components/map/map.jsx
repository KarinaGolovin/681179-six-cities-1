import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.mapZoom = 12;
    this._mapRef = React.createRef();
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}></div>
    );
  }

  componentDidMount() {
    const map = L.map(this._mapRef.current, {
      center: this.props.cityCoords,
      zoom: this.mapZoom,
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

    map.setView(this.props.cityCoords, this.mapZoom);

    this.props.placesList.map((place) => {
      return place.coordinates;
    }).map((offerCoords) => {
      return L
        .marker(offerCoords, {mapIcon})
        .addTo(map);
    });
  }

}

Map.propTypes = {
  cityCoords: PropTypes.array.isRequired,
  placesList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    picture: PropTypes.string,
    link: PropTypes.string,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    id: PropTypes.string,
    coordinates: PropTypes.array,
  })).isRequired,
};

export default Map;
