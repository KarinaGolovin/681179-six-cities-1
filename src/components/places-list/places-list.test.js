import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from './places-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

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
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    previewImage: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: 3,
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    previewImage: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: 4,
  },
];

const PlacesListWrapped = withActiveItem(PlacesList);

it(`PlaceCard correctly renders`, () => {
  const component = renderer.create(
      <PlacesListWrapped
        offers={mock}
        onActiveItemChange={() => {}}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
