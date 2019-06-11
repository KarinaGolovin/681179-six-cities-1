import React from 'react';
import renderer from 'react-test-renderer';
import FavoritesScreen from './favorites-screen.jsx';

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
  const component = renderer.create(
      <FavoritesScreen
        favoriteList={mock}
        updateBookmark={() => {}}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
