import React from 'react';
import renderer from 'react-test-renderer';
import {OfferHostBlock} from './offer-host-block';

const mock = {
  name: `Test`,
  avatar: ``,
  status: false,
  description: ``,
}

it(`OfferHostBlock correctly renders`, () => {
  const component = renderer.create(
      <OfferHostBlock
        userName={mock.name}
        userAvatar={mock.avatar}
        userStatus={mock.status}
        offerDescription={mock.description}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
