import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {LoginScreen} from './login-screen.jsx';

const renderer = new ShallowRenderer();

it(`LoginScreen correctly renders`, () => {
  const component = renderer.render(
      <LoginScreen
        onSingIn={() => {}}/>
  );

  expect(component).toMatchSnapshot();
});
