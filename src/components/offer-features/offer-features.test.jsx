import React from 'react';
import renderer from 'react-test-renderer';
import {OfferFeatures} from './offer-features.jsx';

const mock = [`Test`, `Test1`, `Test2`];

it(`OfferFeatures correctly renders`, () => {
  const component = renderer.create(
      <OfferFeatures
        featureList={mock}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
