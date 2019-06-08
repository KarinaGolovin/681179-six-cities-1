import React from 'react';
import renderer from 'react-test-renderer';
import {Rating} from './rating.jsx';

it(`Rating correctly renders`, () => {
  const component = renderer.create(
      <Rating rating={3.5} />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
