import React from 'react';
import {PageTemplate} from './page-template.jsx';
import {Router} from 'react-router-dom';
import history from '../../history';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();

const mockUser = {
  id: 1,
  email: `test@test.com`,
  name: `Test`,
  avatar: ``,
  isPro: false,
};

it(`PageTemplate correctly renders`, () => {
  const component = renderer.render(
      <Router history={history}>
        <PageTemplate
          isAuthorizationRequired={false}
          user={mockUser}
        />
      </Router>
  );

  expect(component).toMatchSnapshot();
});
