import React from 'react';
import renderer from 'react-test-renderer';
import {PageTemplate} from './page-template.jsx';
import {Router} from 'react-router-dom';
import history from '../../history';

const mockUser = {
  id: 1,
  email: `test@test.com`,
  name: `Test`,
  avatar: ``,
  isPro: false,
};

it(`PageTemplate correctly renders`, () => {
  const component = renderer.create(
      <Router history={history}>
        <PageTemplate
          isAuthorizationRequired={false}
          user={mockUser}
        />
      </Router>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
