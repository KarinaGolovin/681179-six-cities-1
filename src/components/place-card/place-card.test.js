import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card.jsx';

it(`PlaceCard correctly renders`, () => {
  const component = renderer.create(
      <PlaceCard
        title={`Some text`}
        onClick={jest.fn()}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
