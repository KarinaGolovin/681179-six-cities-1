import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard title link works correctly`, () => {
  const clickHandler = jest.fn();
  const component = shallow(
      <PlaceCard
        title={`Some text`}
        onClick={clickHandler}
      />
  );

  component.find(`.place-card__name a`).simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
