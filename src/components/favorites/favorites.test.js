import React from 'react';
import renderer from 'react-test-renderer';
import {Favorites} from './favorites.jsx';

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
    location: {
      latitude: 0, longitude: 3,
    },
    city: {
      name: `Test`,
      location: {
        latitude: 0, longitude: 3,
      },
    },
  }
];

it(`Favorites correctly renders`, () => {
  const component = renderer.create(
      <Favorites
        onCityClick={() => {}}
        favoriteList={mock}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
