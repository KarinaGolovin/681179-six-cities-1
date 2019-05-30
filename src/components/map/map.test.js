import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';


const mock = [
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    previewImage: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: 1,
    coordinates: [],
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    previewImage: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: 2,
    coordinates: [],
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    previewImage: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: 3,
    coordinates: [],
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    previewImage: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: 4,
    coordinates: [],
  },
];

it(`Map correctly renders`, () => {
  const component = renderer.create(
      <Map
        placesList={mock}
        cityCoords={[0, 0]}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
