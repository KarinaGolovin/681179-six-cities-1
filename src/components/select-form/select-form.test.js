import React from 'react';
import renderer from 'react-test-renderer';
import SelectForm from './select-form.jsx';

it(`SelectForm correctly renders`, () => {
  const component = renderer.create(
      <SelectForm />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
