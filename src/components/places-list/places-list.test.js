import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from './places-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

const mock = [
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `001`,
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `002`,
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `003`,
  },
  {
    title: `Test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: `#`,
    rating: 0,
    isPremium: true,
    id: `004`,
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
