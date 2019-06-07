import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Favorites} from './favorites.jsx';

configure({adapter: new Adapter()});

const mock = [
  {
    Test1: [
      {
        title: `Title1`,
        type: `Type1`,
        price: 1,
        previewImage: `Img1`,
        link: `Link1`,
        onLinkClick: (() => { }),
      }
    ],
    Test2: [
      {
        title: `Title2`,
        type: `Type2`,
        price: 2,
        previewImage: `Img2`,
        link: `Link2`,
        onLinkClick: (() => { }),
      }
    ]
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

  component.find(`.location__item-link`).simulate(`click`);

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
