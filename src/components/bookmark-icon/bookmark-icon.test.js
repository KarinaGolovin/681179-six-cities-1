import React from 'react';
import renderer from 'react-test-renderer';
import {BookmarkIcon} from './bookmark-icon.jsx';

it(`Bookmark correctly renders`, () => {
  const component = renderer.create(
      <BookmarkIcon
        onBookmarkClick={() => {}}
        isBookmarked={false}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
