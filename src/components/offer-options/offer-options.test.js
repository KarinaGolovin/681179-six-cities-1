import React from 'react';
import renderer from 'react-test-renderer';
import {OfferOptions} from './offer-options.jsx';

it(`OfferOptions correctly renders`, () => {
  const component = renderer.create(
      <OfferOptions
        offerType={`test`}
        offerBedrooms={1}
        offerCapacity={1}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
