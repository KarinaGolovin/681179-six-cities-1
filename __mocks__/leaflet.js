const leaflet = jest.genMockFromModule(`leaflet`);

const marker = {
  getLatLng: () => {
    return {lat: 0, lng: 0};
  },
  addTo: () => {
    return {};
  }
};

leaflet.tileLayer = () => {};

leaflet.icon = () => {};

leaflet.setView = () => {};

leaflet.map = () => {
  return leaflet;
};

leaflet.marker = () => {
  return marker;
};

leaflet.remove = () => {
  return leaflet;
};

leaflet.removeLayer = () => {
  return leaflet;
};

export default leaflet;
