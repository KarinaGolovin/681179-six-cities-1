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
    previewImage: ``,
    link: ``,
    rating: 0,
    isPremium: true,
    id: 1
  },
  {
    title: `Test test`,
    type: `Test`,
    price: 0,
    previewImage: ``,
    link: ``,
    rating: 0,
    isPremium: true,
    id: 2
  },
];

describe(`Check PlacesList functions works correctly`, () => {
  it(`Place card return target value on mouse over`, () => {
    const clickHandler = jest.fn();
    const component = mount(<PlacesList
      offers={mock}
      onActiveItemChange={clickHandler}
    />);

    const card = component.find(`.place-card`).first();

    card.simulate(`mouseenter`);

    expect(clickHandler).toHaveBeenCalledWith({
      title: `Test test`,
      type: `Test`,
      price: 0,
      previewImage: ``,
      link: ``,
      rating: 0,
      isPremium: true,
      id: 1
    });
  });

  it(`Place card mouse leave works`, () => {
    const clickHandler = jest.fn();

    const component = mount(<PlacesList
      offers={mock}
      onActiveItemChange={clickHandler}
    />);

    const card = component.find(`.place-card`).first();
    card.simulate(`mouseenter`);
    card.simulate(`mouseleave`);

    expect(clickHandler).toHaveBeenCalledTimes(2);
  });
});


