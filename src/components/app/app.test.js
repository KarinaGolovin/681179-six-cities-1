import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import App from './app.jsx';
import {createStore} from 'redux';

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
    location: {
      latitude: 0, longitude: 3,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 0, longitude: 3,
      },
    },
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
    location: {
      latitude: 0, longitude: 3,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 0, longitude: 3,
      },
    },
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
    location: {
      latitude: 0, longitude: 3,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 0, longitude: 3,
      },
    },
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
