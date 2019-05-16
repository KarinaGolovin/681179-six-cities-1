import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';


const mock = [
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `001`,
    coordinates: [],
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `002`,
    coordinates: [],
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `003`,
    coordinates: [],
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `004`,
    coordinates: [],
  },
];

it(`Map correctly renders`, () => {
  const component = renderer.create(
      <Map
        placesList={mock}
        cityCoords={[0, 0]}
        // offers={mock}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
