import React from 'react';
import renderer from 'react-test-renderer';
import {ErrorMessage} from '../error-message/error-message.jsx';

it(`ErrorMessage correctly renders`, () => {
  const component = renderer.create(
      <ErrorMessage message={`Oooops`}/>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
