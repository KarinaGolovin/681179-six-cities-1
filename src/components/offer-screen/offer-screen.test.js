import React from 'react';
import OfferScreen from './offer-screen.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();

it(`OfferScreen correctly renders`, () => {
  const component = renderer.render(
      <OfferScreen />
  );

  expect(component).toMatchSnapshot();
});
