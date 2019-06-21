import React from 'react';
import renderer from 'react-test-renderer';
import OfferScreen from './offer-screen.jsx';

it(`OfferScreen correctly renders`, () => {
  const component = renderer.create(
      <OfferScreen />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
