import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

const CitiesListWrapped = withActiveItem(CitiesList);

it(`CitiesList correctly renders`, () => {
  const component = renderer.create(
      <CitiesListWrapped
        cities={[`Test`, `Test Test`]}
        onCityClick={() => {}}
        onActiveItemChange={() => {}}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
