const leaflet = jest.genMockFromModule(`leaflet`);

leaflet.tileLayer = () => {};

leaflet.icon = () => {};

leaflet.setView = () => {};

leaflet.map = () => {
  return leaflet;
};

leaflet.marker = () => {
  return leaflet;
};

leaflet.addTo = () => {
  return leaflet;
};

export default leaflet;
