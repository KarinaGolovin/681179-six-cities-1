import React from 'react';
import renderer from 'react-test-renderer';
import {HomeScreen} from './home-screen.jsx';

it(`HomeScreen correctly renders`, () => {
  const component = renderer.create(
      <HomeScreen selectedCityName={`Test`}/>
  ).toJSON();

  expect(component).toMatchSnapshot();
});

