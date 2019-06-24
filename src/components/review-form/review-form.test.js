import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewForm} from './review-form.jsx';

it(`ReviewForm correctly renders`, () => {
  const component = renderer.create(
      <ReviewForm
        onFormChange={() => {}}
        onFormSubmit={() => {}}
        form={{
          rating: null,
          review: ``
        }}
        isValid={false}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
