import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {BrowserRouter as Router} from 'react-router-dom';

const CitiesListWrapped = withActiveItem(CitiesList);

it(`CitiesList correctly renders`, () => {
  const component = renderer.create(
      <Router>
        <CitiesListWrapped
          cities={[`Test`, `Test Test`]}
          onCityClick={() => {
          }}
          onActiveItemChange={() => {
          }}
        />
      </Router>,
  ).toJSON();

  expect(component).toMatchSnapshot();
});
