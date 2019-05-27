import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import App from './app.jsx';
import {createStore} from 'redux';

const mock = [
  {
    city: `Amsterdam`,
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `001`,
    cityCoordinates: [0, 0]
  },
  {
    city: `Amsterdam`,
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `002`,
    cityCoordinates: [0, 0]
  },
  {
    city: `Amsterdam`,
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `003`,
    cityCoordinates: [0, 0]
  },
  {
    city: `Amsterdam`,
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `004`,
    cityCoordinates: [0, 0]
  },
];

const initialState = {
  currentCity: null,
  offers: mock
};

const reducer = (state = initialState) => {
  return state;
};

it(`App correctly renders`, () => {
  const component = renderer.create(
      <Provider store={createStore(reducer)}>
        <App
        />
      </Provider>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
