import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ReviewForm} from './review-form.jsx';

configure({adapter: new Adapter()});

it(`ReviewForm on submit without data works correctly`, () => {
  const onSubmitClick = jest.fn();
  const component = shallow(
      <ReviewForm
        onSubmitRating={onSubmitClick}
      />
  );

  component.find(`.reviews__form`).simulate(`submit`);

  expect(onSubmitClick).toHaveBeenCalledTimes(0);
});

it(`ReviewForm on submit with text, without star works correctly`, () => {
  const onSubmitClick = jest.fn();
  const component = shallow(
      <ReviewForm
        onSubmitRating={onSubmitClick}
      />
  );

  component.find(`textarea`).simulate(`change`, {target: {value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}});

  component.find(`.reviews__form`).simulate(`submit`);

  expect(onSubmitClick).toHaveBeenCalledTimes(0);
});

it(`ReviewForm on submit with stars, without text works correctly`, () => {
  const onSubmitClick = jest.fn();
  const component = shallow(
      <ReviewForm
        onSubmitRating={onSubmitClick}
      />
  );

  component.find(`input`).simulate(`change`, {target: {value: `5`}});

  component.find(`.reviews__form`).simulate(`submit`);

  expect(onSubmitClick).toHaveBeenCalledTimes(0);
});

it(`ReviewForm on submit with data works correctly`, () => {
  const onSubmitClick = jest.fn();
  const component = shallow(
      <ReviewForm
        onSubmitRating={onSubmitClick}
      />
  );

  component.find(`input`).simulate(`change`, {target: {value: `5`}});
  component.find(`textarea`).simulate(`change`, {target: {value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}});

  component.find(`.reviews__form`).simulate(`submit`);

  expect(onSubmitClick).toHaveBeenCalledTimes(1);
  expect(onSubmitClick).toHaveBeenCalledWith({
    rating: 5,
    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  });
});
