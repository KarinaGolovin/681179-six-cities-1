import React from 'react';
import PropTypes from 'prop-types';

export const BookmarkIcon = ({
  onBookmarkClick,
  isBookmarked,
  bookmarkClass = `place-card`,
  sizeKey = `small`
}) => {
  const bookmarkSizes = {
    big: {
      width: 31,
      height: 33,
    },
    small: {
      width: 18,
      height: 19,
    }
  };

  return (
    <button onClick={onBookmarkClick} className={`${bookmarkClass}__bookmark-button ${isBookmarked ? `${bookmarkClass}__bookmark-button--active` : ``} button`} type="button">
      <svg className={`${bookmarkClass}__bookmark-icon`} width={bookmarkSizes[sizeKey].width || `18`} height={bookmarkSizes[sizeKey].height || `19`}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{isBookmarked ? `In bookmarks` : `To bookmarks`}</span>
    </button>
  );
};

BookmarkIcon.propTypes = {
  onBookmarkClick: PropTypes.func,
  isBookmarked: PropTypes.bool,
  bookmarkClass: PropTypes.string,
  sizeKey: PropTypes.oneOf([`big`, `small`])
};
