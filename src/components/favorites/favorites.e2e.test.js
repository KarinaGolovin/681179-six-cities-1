import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Favorites} from './favorites.jsx';
import history from '../../history';
import {Router} from 'react-router-dom';

configure({adapter: new Adapter()});

const mockList = [
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
      <Router history={history}>
        <Favorites
          onCityClick={onCityClick}
          favoriteList={mockList}
          favoritesByCity={[[`Test`, mockList]]}
        />
      </Router>
  );

  component.find(`.locations__item-link`).simulate(`click`);

  expect(onCityClick).toHaveBeenCalledTimes(1);
});

