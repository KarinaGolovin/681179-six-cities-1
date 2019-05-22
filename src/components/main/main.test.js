import React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main.jsx';

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

it(`Main correctly renders`, () => {
  const component = renderer.create(
      <Main
        coordinatesByCity={{Test: [0, 0]}}
        currentCity={`Test Test`}
        currentPlaces={mock}
        setNewCity={()=>{}}
        cityCoords={[0, 0]}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
