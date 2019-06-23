import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card.jsx';
import history from '../../history';
import {Router} from 'react-router-dom';

it(`PlaceCard correctly renders`, () => {
  const component = renderer.create(
      <Router history={history}>
        <PlaceCard
          title={`Some text`}
          onClick={jest.fn()}
        />
      </Router>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
