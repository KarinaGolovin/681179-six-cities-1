import React from 'react';
import renderer from 'react-test-renderer';
import {LoginScreen} from './login-screen.jsx';

it(`LoginScreen correctly renders`, () => {
  const component = renderer.create(
      <LoginScreen
        onSingIn={() => {}}/>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
