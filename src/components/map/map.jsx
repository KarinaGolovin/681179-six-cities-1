import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.mapZoom = 12;
    this._mapRef = React.createRef();

    this._mapInstance = null;
    this._mapIcon = null;
    this._markers = [];
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}></div>
    );
  }

  componentDidMount() {
    this._mapInstance = L.map(this._mapRef.current, {
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

    this._mapIcon = L.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this._mapInstance.setView(this.props.cityCoords, this.mapZoom);
    this._addMarkers(this.props.placesList);
  }

  componentDidUpdate(prevProps) {
    if (this._isCoordinatesUpdated(this.props.cityCoords, prevProps.cityCoords)) {
      this._mapInstance.setView(this.props.cityCoords, this.mapZoom);
    }

    if (this.props.placesList !== prevProps.placesList) {
      const pinDiff = this._getArrsDiff(this.props.placesList, prevProps.placesList);

      this._removeMarkers(pinDiff.remove);
      this._addMarkers(pinDiff.add);
    }
  }

  _addMarkers(placesList) {
    const newMarkers = placesList.map((place) => {
      return {
        id: place.id,
        marker: L
          .marker(place.coordinates, {mapIcon: this._mapIcon})
          .addTo(this._mapInstance)
      };
    });

    this._markers = [].concat(this._markers, newMarkers);
  }

  _removeMarkers(placesList) {
    const ids = placesList.map((place) => place.id);

    this._markers = this._markers.filter((marker) => {
      const shouldRemove = ids.includes(marker.id);

      if (shouldRemove) {
        this._mapInstance.removeLayer(marker.marker);
      }
      return !shouldRemove;
    });
  }

  componentWillUnmount() {
    this._mapInstance.remove();
    this._mapInstance = null;
    this._markers = null;
    this._mapIcon = null;
  }

  _arrById(arr) {
    return arr.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  }

  _getArrsDiff(arr, prevArr) {
    const prevById = this._arrById(prevArr);
    const curById = this._arrById(arr);

    return {
      add: arr.filter((item) => {
        return !prevById[item.id];
      }),
      remove: prevArr.filter((item) => {
        return !curById[item.id];
      })
    };
  }

  _isCoordinatesUpdated(newCoordinates, oldCoordinates) {
    return newCoordinates[0] !== oldCoordinates[0] || newCoordinates[1] !== oldCoordinates[1];
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
    id: PropTypes.string.isRequired,
    coordinates: PropTypes.array,
  })).isRequired,
};

export default Map;
