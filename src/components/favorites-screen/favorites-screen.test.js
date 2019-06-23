import React from 'react';
import {FavoritesScreen} from './favorites-screen.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();

const mock = [
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    previewImage: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: 1,
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    previewImage: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: 2,
  },
];

it(`FavoritesScreen correctly renders`, () => {
  const component = renderer.render(
      <FavoritesScreen
        favoriteList={mock}
        updateBookmark={() => {}}
      />
  );

  expect(component).toMatchSnapshot();
});
