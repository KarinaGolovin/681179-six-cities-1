import React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main.jsx';
import {BrowserRouter as Router} from 'react-router-dom';

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
    location: {
      latitude: 0, longitude: 3,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 0, longitude: 3,
      },
    },
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
    location: {
      latitude: 0, longitude: 3,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 0, longitude: 3,
      },
    },
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
    location: {
      latitude: 0, longitude: 3,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 0, longitude: 3,
      },
    },
  },
];

it(`Main correctly renders`, () => {
  const component = renderer.create(
      <Router>
        <Main
          currentCity={`Test`}
          currentPlaces={mock}
          coordinatesByCity={{
            Test: [0, 0]
          }}
        />
      </Router>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
