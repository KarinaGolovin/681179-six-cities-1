import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

it(`Main correctly renders`, () => {
  const component = renderer.create(
      <Main/>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
