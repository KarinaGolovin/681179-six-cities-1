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

  component.find(`.place-card__bookmark-button`).simulate(`click`);

  expect(onBookmarkClick).toHaveBeenCalledTimes(1);
  expect(component.firstChild).toHaveClass(`place-card__bookmark-button--active`);
});
