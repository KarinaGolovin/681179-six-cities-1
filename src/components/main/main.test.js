import React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main.jsx';

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
    city: `Test`,
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
    city: `Amsterdam`,
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
    city: `Amsterdam`,
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
    city: `Amsterdam`,
  },
];

it(`Main correctly renders`, () => {
  const component = renderer.create(
      <Main
        currentCity={`Test`}
        currentPlaces={mock}
        setNewCity={() => { }}
        coordinatesByCity={{
          Test: [0, 0]
        }}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
