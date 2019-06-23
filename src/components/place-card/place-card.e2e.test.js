import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';

configure({adapter: new Adapter()});

it(`PlaceCard mouseenter on picture correctly works`, () => {
  const onPictureMouseEnter = jest.fn();
  const component = shallow(
      <PlaceCard
        title={`Some text`}
        previewImage={`http://placehold.it/134x134`}
        onPictureMouseEnter={onPictureMouseEnter}
      />
  );

  component.find(`.place-card`).simulate(`mouseenter`);

  expect(onPictureMouseEnter).toHaveBeenCalledTimes(1);
});

it(`PlaceCard mouseleave on picture correctly works`, () => {
  const onPictureMouseLeave = jest.fn();
  const component = shallow(
      <PlaceCard
        title={`Some text`}
        previewImage={`http://placehold.it/134x134`}
        onPictureMouseLeave={onPictureMouseLeave}
      />
  );

  component.find(`.place-card`).simulate(`mouseleave`);

  expect(onPictureMouseLeave).toHaveBeenCalledTimes(1);
});
