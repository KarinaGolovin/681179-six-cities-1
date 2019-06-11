import React from 'react';
import renderer from 'react-test-renderer';
import PageTemplate from './page-template.jsx';

const mockUser = {
  id: 1,
  email: `test@test.com`,
  name: `Test`,
  avatar: ``,
  isPro: false,
};

it(`PageTemplate correctly renders`, () => {
  const component = renderer.create(
      <PageTemplate
        isAuthorizationRequired={false}
        user={mockUser}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
