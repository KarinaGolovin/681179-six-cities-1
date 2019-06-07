import React from 'react';
import PropTypes from 'prop-types';

export const Favorites = ({favoriteList: list, onCityClick, onLinkClick, onBookmarkClick}) => {
  return (
    <section className={`favorites ${!list.length ? `favorites--empty` : ``}`}>
      {
        !list.length ? <>
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan yor future
              trips.</p>
          </div>
        </> : <>
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.entries(groupByCity(list)).map(([city, cards]) => {
              return <FavoriteLocation
                city={city}
                cards={cards}
                key={city}
                onLinkClick={onLinkClick}
                onCityClick={onCityClick}
                onBookmarkClick={onBookmarkClick}
              />;
            })}
          </ul>
        </>
      }
    </section>
  );
};

Favorites.propTypes = {
  favoriteList: PropTypes.array,
  onCityClick: PropTypes.func,
  onLinkClick: PropTypes.func,
  updateBookmark: PropTypes.func,
};

const FavoriteLocation = ({city, cards, onCityClick, onLinkClick, onBookmarkClick}) => {
  return (
    <>
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#" onClick={onCityClick}>
              <span>{city}</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          {cards.map((it) => {
            return (
              <FavoritePlaceCard
                isBookmarked={it.is_favorite}
                title={it.title}
                type={it.type}
                price={it.price}
                previewImage={it.preview_image}
                link={it.link}
                rating={it.rating}
                isPremium={it.is_premium}
                onLinkClick={onLinkClick}
                onBookmarkClick={() => {
                  onBookmarkClick({
                    hotelId: it.id,
                    status: it.is_favorite ? 0 : 1
                  });
                }}
                id={it.id}
                key={it.id}
              />
            );
          })}
        </div>
      </li>
    </>
  );
};

FavoriteLocation.propTypes = {
  cards: PropTypes.array,
  city: PropTypes.string,
  onCityClick: PropTypes.func,
  onLinkClick: PropTypes.func,
  onBookmarkClick: PropTypes.func,
};

const FavoritePlaceCard = ({title, type, price, previewImage, link, onLinkClick, onBookmarkClick, isBookmarked}) => {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src="img/room-small.jpg" width="150" height="110" alt="Place image" src={previewImage}/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={onBookmarkClick} className={`place-card__bookmark-button ${isBookmarked ? `place-card__bookmark-button--active` : ``} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: `80 %`
            }} />
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

FavoritePlaceCard.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
  previewImage: PropTypes.string,
  link: PropTypes.string,
  onLinkClick: PropTypes.func,
  onBookmarkClick: PropTypes.func,
  isBookmarked: PropTypes.bool,
};

const groupByCity = (offers) => {
  return offers.reduce((byCity, it) => {
    if (!byCity[it.city.name]) {
      byCity[it.city.name] = [];
    }
    byCity[it.city.name].push(it);
    return byCity;
  }, {});
};
