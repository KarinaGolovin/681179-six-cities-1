import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from './sign-in.jsx';

it(`SignIn correctly renders`, () => {
  const component = renderer.create(
      <SignIn
        onLogin={jest.fn()}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
