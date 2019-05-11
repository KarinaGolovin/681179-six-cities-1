import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard title link works correctly`, () => {
  const onLinkClick = jest.fn();
  const component = shallow(
      <PlaceCard
        title={`Some text`}
        picture={`http://placehold.it/134x134`}
        onClick={onLinkClick}
      />
  );

  component.find(`.place-card__name a`).simulate(`click`);

  expect(onLinkClick).toHaveBeenCalledTimes(1);
});

it(`PlaceCard picture click works`, () => {
  const onPictureClick = jest.fn();
  const component = shallow(
      <PlaceCard
        title={`Some text`}
        picture={`http://placehold.it/134x134`}
        onClick={onPictureClick}
      />
  );

  component.find(`.place-card__image-wrapper a`).simulate(`click`);

  expect(onPictureClick).toHaveBeenCalledTimes(1);
});

it(`PlaceCard mouseenter on picture correctly works`, () => {
  const onPictureMouseEnter = jest.fn();
  const component = shallow(
      <PlaceCard
        title={`Some text`}
        picture={`http://placehold.it/134x134`}
        onMouseEnter={onPictureMouseEnter}
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
        picture={`http://placehold.it/134x134`}
        onMouseLeave={onPictureMouseLeave}
      />
  );

  component.find(`.place-card`).simulate(`mouseleave`);

  expect(onPictureMouseLeave).toHaveBeenCalledTimes(1);
});
