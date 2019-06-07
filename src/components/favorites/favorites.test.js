import React from 'react';
import renderer from 'react-test-renderer';
import {Favorites} from './favorites.jsx';

const mock = [
  {Test: [
    {
      title: `Title`,
      type: `Type`,
      price: 1,
      previewImage: `Img`,
      link: `Link`,
      onLinkClick: (() => {}),
    }
  ]}
];

it(`Favorites correctly renders`, () => {
  const component = renderer.create(
      <Favorites
        onCityClick={() => {}}
        favoriteList={mock}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
