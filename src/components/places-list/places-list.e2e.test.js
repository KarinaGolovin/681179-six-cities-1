import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlacesList from './places-list.jsx';

configure({adapter: new Adapter()});

const mock = [
  {
    title: `Test test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: ``,
    rating: 0,
    isPremium: true,
    id: `001 Test`
  },
  {
    title: `Test test`,
    type: `Test`,
    price: 0,
    picture: ``,
    link: ``,
    rating: 0,
    isPremium: true,
    id: `002 Test`
  },
];

describe(`Check PlacesList state works correctly`, () => {
  it(`Place card state changed to is active on mouse over`, () => {
    const component = mount(<PlacesList
      offers={mock}
    />);

    const card = component.find(`.place-card`);

    card.simulate(`mouseenter`);
    component.update();

    expect(component.state(`activeCard`)).toEqual({
      title: `Test test`,
      type: `Test`,
      price: 0,
      picture: ``,
      link: ``,
      rating: 0,
      isPremium: true,
      id: `001 Test`
    });
  });

  it(`Place card state change to not to be active on mouse leave`, () => {
    const component = mount(<PlacesList
      offers={mock}
    />);

    const card = component.find(`.place-card`);

    card.simulate(`mouseenter`);
    component.update();

    card.simulate(`mouseleave`);
    component.update();

    expect(component.state(`activeCard`)).toEqual(null);
  });
});


