import React from 'react';
import PropTypes from 'prop-types';

const PlaceCard = (props) => {
  const {
    title,
    type,
    price,
    previewImage,
    link,
    isBookmarked,
    isPremium,
    rating,
    onPictureClick,
    onPictureMouseEnter,
    onPictureMouseLeave,
    onLinkClick,
    onBookmarkClick,
    classes = {
      container: ``,
      imageWrapper: ``,
      cardInfo: ``
    },
    id
  } = props;

  console.log(props);

  return (
    <article className={`place-card ${classes.container || ``}`} onMouseEnter={onPictureMouseEnter} onMouseLeave={onPictureMouseLeave} id={id}>
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}

      <div className={`cities__image-wrapper ${classes.imageWrapper || ``}`}>
        <a href="#" onClick={onPictureClick}>
          <img className="place-card__image" width="260" height="200" alt="Place image" src={previewImage}/>
        </a>
      </div>
      <div className={`place-card__info ${classes.cardInfo || ``}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={onBookmarkClick} className={`place-card__bookmark-button ${isBookmarked ? `place-card__bookmark-button--active` : ``} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{isBookmarked ? `In bookmarks` : `To bookmarks`}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: `${rating / 5 * 100}%`
            }}>
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={link} onClick={onLinkClick}>{title}</a>
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
  link: PropTypes.string,
  rating: PropTypes.number,
  isPremium: PropTypes.bool,
  isBookmarked: PropTypes.bool,
  onPictureClick: PropTypes.func,
  onLinkClick: PropTypes.func,
  onPictureMouseEnter: PropTypes.func,
  onPictureMouseLeave: PropTypes.func,
  onBookmarkClick: PropTypes.func,
  id: PropTypes.number,
  classes: PropTypes.object
};

export default PlaceCard;
