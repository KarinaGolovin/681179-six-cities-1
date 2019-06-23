import React from 'react';
import HomeScreen from './home-screen.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();

it(`HomeScreen correctly renders`, () => {
  const component = renderer.render(
      <HomeScreen selectedCityName={`Test`}/>
  );

  expect(component).toMatchSnapshot();
});

