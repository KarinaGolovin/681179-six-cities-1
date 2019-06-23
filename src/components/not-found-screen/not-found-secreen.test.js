import React from 'react';
import NotFoundScreen from './not-found-screen.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();

it(`NotFoundScreen correctly renders`, () => {
  const component = renderer.render(
      <NotFoundScreen />
  );

  expect(component).toMatchSnapshot();
});

