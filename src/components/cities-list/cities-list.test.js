import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';

it(`CitiesList correctly renders`, () => {
  const component = renderer.create(
      <CitiesList
        cities={[`Test`, `Test Test`]}
        onCityClick={() => {}}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
