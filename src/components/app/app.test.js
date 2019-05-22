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
const reducer = () => {
  return {
    currentCity: null,
    offers: {mock}
  };
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
