import React from 'react';
import renderer from 'react-test-renderer';
import MainEmpty from './main-empty.jsx';

it(`MainEmpty correctly renders`, () => {
  const component = renderer.create(
      <MainEmpty/>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
