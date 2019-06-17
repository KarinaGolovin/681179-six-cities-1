import React from 'react';
import renderer from 'react-test-renderer';
import ReviewForm from './review-form.jsx';

it(`ReviewForm correctly renders`, () => {
  const component = renderer.create(
      <ReviewForm
        onSubmitRating={() => {}}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
