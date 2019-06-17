import React from 'react';
import renderer from 'react-test-renderer';
import Offer from './offer.jsx';

const mockOffer = {
  title: `Test`,
  type: `Test`,
  price: 0,
  previewImage: ``,
  link: `#`,
  rating: 0,
  isPremium: true,
  id: 1,
};

const mockComment = {
  id: 1,
  user: {
    id: 1,
    is_pro: false,
    name: `TestName`,
    avatar_url: ``
  },
  rating: 1,
  comment: `Test comment`,
  date: ``
};

it(`Offer correctly renders`, () => {
  const component = renderer.create(
      <Offer
        offer={mockOffer}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
