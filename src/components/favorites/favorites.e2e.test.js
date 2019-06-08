import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Favorites} from './favorites.jsx';

configure({adapter: new Adapter()});

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
    location: {
      latitude: 0, longitude: 3,
    },
    city: {
      name: `Test`,
      location: {
        latitude: 0, longitude: 3,
      },
    },
  }
];


it(`Favorites City title link works correctly`, () => {
  const onCityClick = jest.fn();
  const component = mount(
      <Favorites
        onCityClick={onCityClick}
        favoriteList={mock}
        onLinkClick={() => {}}
      />
  );

  component.find(`.locations__item-link`).simulate(`click`);

  expect(onCityClick).toHaveBeenCalledTimes(1);
});

it(`Favorites Card title link works correctly`, () => {
  const onLinkClick = jest.fn();
  const component = mount(
      <Favorites
        onLinkClick={onLinkClick}
        favoriteList={mock}
        onCityClick={() => { }}
      />
  );

  component.find(`.place-card__name a`).simulate(`click`);

  expect(onLinkClick).toHaveBeenCalledTimes(1);
});
