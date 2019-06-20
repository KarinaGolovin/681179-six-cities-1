import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Rating} from '../rating/rating.jsx';
import {BookmarkIcon} from '../bookmark-icon/bookmark-icon.jsx';

const PlaceCard = (props) => {
  const {
    title,
    type,
    price,
    previewImage,
    isBookmarked,
    isPremium,
    rating,
    onPictureMouseEnter,
    onPictureMouseLeave,
    onBookmarkClick,
    classes = {
      container: ``,
      imageWrapper: ``,
      cardInfo: ``,
      bookmark: ``,
    },
    bookmarkSize,
    imageWidth = 260,
    imageHeight = 200,
    id
  } = props;

  return (
    <article
      className={`place-card ${classes.container || ``}`}
      onFocus={onPictureMouseEnter}
      onBlur={onPictureMouseLeave}
      onMouseEnter={onPictureMouseEnter}
      onMouseLeave={onPictureMouseLeave}
      id={id}
    >
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}

      <div className={`place-card__image-wrapper ${classes.imageWrapper || ``}`} >
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" width={imageWidth} height={imageHeight} alt="Place image" src={previewImage} />
        </Link>
      </div>
      <div className={`place-card__info ${classes.cardInfo || ``}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkIcon
            isBookmarked={isBookmarked}
            onBookmarkClick={onBookmarkClick}
            bookmarkClass={classes.bookmark}
            sizeKey={bookmarkSize}
          />
        </div>
        <Rating
          rating={rating}
          classes={{
            container: `place-card__rating`,
            stars: `place-card__stars`
          }} />
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  price: PropTypes.number,
  previewImage: PropTypes.string,
  rating: PropTypes.number,
  isPremium: PropTypes.bool,
  isBookmarked: PropTypes.bool,
  onPictureClick: PropTypes.func,
  onPictureMouseEnter: PropTypes.func,
  onPictureMouseLeave: PropTypes.func,
  onBookmarkClick: PropTypes.func,
  id: PropTypes.number,
  classes: PropTypes.object,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  bookmarkSize: PropTypes.oneOf([`big`, `small`])
};

export default PlaceCard;
