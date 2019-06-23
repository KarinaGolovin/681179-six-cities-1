import React from 'react';
import renderer from 'react-test-renderer';
import SelectForm from './select-form.jsx';

it(`SelectForm correctly renders`, () => {
  const component = renderer.create(
      <SelectForm onSortTypeChange={() => {}}/>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
