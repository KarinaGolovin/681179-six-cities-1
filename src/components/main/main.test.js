import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

it(`Main correctly renders`, () => {
  const component = renderer.create(
      <Main
        title={`Some text`}
        key={`Some text`}
        onClick={jest.fn()}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
