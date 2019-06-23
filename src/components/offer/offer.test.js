import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Offer} from './offer.jsx';

const renderer = new ShallowRenderer();

let mockOffer;
mockOffer = {
  city: {
    name: `Test`,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 13,
    },
  },
  images: [],
  title: `The house among olive `,
  rating: 4.5,
  type: `apartment`,
  bedrooms: 1,
  price: 163,
  goods: [],
  host: {
    id: 0,
    name: `Angelina`
  },
  description: `This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`,
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 1,
  },
  id: 1,
};

it(`Offer correctly renders`, () => {
  const component = renderer.render(
      <Offer
        offer={mockOffer}
        nearbyPlaces={[]}
        onActiveItemChange={() => {}}
      />
  );

  expect(component).toMatchSnapshot();
});
