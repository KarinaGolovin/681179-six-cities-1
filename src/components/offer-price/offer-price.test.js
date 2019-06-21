import React from 'react';
import renderer from 'react-test-renderer';
import {OfferPrice} from './offer-price.jsx';

it(`OfferPrice correctly renders`, () => {
  const component = renderer.create(
      <OfferPrice
        price={1}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
