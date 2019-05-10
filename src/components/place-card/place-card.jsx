import React from 'react';
import PropTypes from 'prop-types';

const PlaceCard = (props) => {
  const {title, type, price, picture, link, onClick, id} = props;

  return (
    <article className="cities__place-card place-card" id={id}>
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" width="260" height="200" alt="Place image" src={picture}/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: `93%`
            }}>
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={link} onClick={onClick}>{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  picture: PropTypes.string,
  link: PropTypes.string.isRequired,
  // rating: PropTypes.number,
  // isPremium: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default PlaceCard;
