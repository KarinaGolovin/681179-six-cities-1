import React from 'react';
import renderer from 'react-test-renderer';
import {Header} from './header.jsx';
import {BrowserRouter as Router} from 'react-router-dom';

const mock = {
  user: {
    email: `test@test.com`,
    avatar: `test`,
  }
};

it(`Header correctly renders`, () => {
  const component = renderer.create(
      <Router>
        <Header
          user={mock}
          onSignClick={() => {
          }}
          onFavoritesRedirect={() => {
          }}
          isAuthorizationRequired={false}
        />
      </Router>,
  ).toJSON();

  expect(component).toMatchSnapshot();
});
