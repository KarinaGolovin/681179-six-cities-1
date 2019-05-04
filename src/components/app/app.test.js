import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

it(`App correctly renders`, () => {
  const component = renderer.create(
      <App />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
