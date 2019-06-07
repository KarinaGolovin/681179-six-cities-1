import React from 'react';
import renderer from 'react-test-renderer';
import {Footer} from './footer.jsx';

it(`Footer correctly renders`, () => {
  const component = renderer.create(
      <Footer />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
