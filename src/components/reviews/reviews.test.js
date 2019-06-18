import React from 'react';
import renderer from 'react-test-renderer';
import {Reviews} from './reviews.jsx';

const mock = {
  offerId: 1,
  comments: {
    id: 2,
    ration: 2,
    comment: ``,
    date: ``,
    user: {
      id: 3,
      isPro: false,
      name: `Test`,
      avatarUrl: ``
    },
  },
  isAuthorizationRequired: true,
};
const loadComments = () => {};

it(`Reviews correctly renders`, () => {
  const component = renderer.create(
      <Reviews
        offerId={mock.offerId}
        loadComments={loadComments}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
