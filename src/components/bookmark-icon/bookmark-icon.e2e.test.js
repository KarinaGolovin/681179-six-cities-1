import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BookmarkIcon} from './bookmark-icon.jsx';

configure({adapter: new Adapter()});

it(`Bookmark button works correctly`, () => {
  const onBookmarkClick = jest.fn();
  const component = mount(
      <BookmarkIcon
        isBookmarked={true}
        onBookmarkClick={onBookmarkClick}
        bookmarkClass={`place-card`}
      />
  );

  const button = component.find(`.place-card__bookmark-button`);
  button.simulate(`click`);

  expect(onBookmarkClick).toHaveBeenCalledTimes(1);
  expect(button.hasClass(`place-card__bookmark-button--active`)).toEqual(true);
});
