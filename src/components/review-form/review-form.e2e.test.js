import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ReviewForm} from './review-form.jsx';

configure({adapter: new Adapter()});

it(`ReviewForm on submit with data works correctly`, () => {
  const onFormSubmit = jest.fn();
  const component = shallow(
      <ReviewForm
        onFormSubmit={onFormSubmit}
        onFormChange={jest.fn()}
        form={{
          rating: null,
          review: ``
        }}
        isValid={true}
      />
  );

  component.find(`input`).first().simulate(`change`, {target: {value: `5`}});
  component.find(`textarea`).simulate(`change`, {target: {value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}});

  component.find(`.reviews__form`).simulate(`submit`);

  expect(onFormSubmit).toHaveBeenCalledTimes(1);
});
