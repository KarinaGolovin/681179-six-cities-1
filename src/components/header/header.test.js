import React from 'react';
import renderer from 'react-test-renderer';
import {Header} from './header.jsx';

const mock = {
  user: {
    email: `test@test.com`,
    avatar: `test`,
  }
};

it(`Header correctly renders`, () => {
  const component = renderer.create(
      <Header
        user={mock}
        onSignClick={() => {}}
        onFavoritesRedirect={() => {}}
        isAuthorizationRequired={false}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
