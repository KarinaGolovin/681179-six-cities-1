import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Header} from './favorites.jsx';

configure({adapter: new Adapter()});

const mock = {
  user: {
    email: `test@test.com`,
    avatar: `test`,
  }
};

it(`Header go to favorites button correctly works`, () => {
  const onFavoritesRedirect = jest.fn();
  const component = mount(
      <Header
        user={mock}
        onSignClick={() => { }}
        onFavoritesRedirect={onFavoritesRedirect}
        isAuthorizationRequired={false}
      />
  );

  component.find(`.user__name`).simulate(`click`);

  expect(onFavoritesRedirect).toHaveBeenCalledTimes(1);
});

it(`Header redirect to SignIn correctly works`, () => {
  const onSignClick = jest.fn();
  const component = mount(
      <Header
        user={mock}
        onSignClick={onSignClick}
        onFavoritesRedirect={() => {}}
        isAuthorizationRequired={true}
      />
  );

  component.find(`.header__login`).simulate(`click`);

  expect(onSignClick).toHaveBeenCalledTimes(1);
});

// it(`Header page correctly renders`)
