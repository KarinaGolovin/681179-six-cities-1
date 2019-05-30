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
    id: `001`,
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
    id: `002`,
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
    id: `003`,
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
    id: `004`,
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
