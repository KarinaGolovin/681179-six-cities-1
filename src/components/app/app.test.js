import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

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
  },
];

it(`App correctly renders`, () => {
  const component = renderer.create(
      <App
        // offers={mock}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
