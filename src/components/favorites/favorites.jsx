import React from 'react';
import PropTypes from 'prop-types';

export const Favorites = (favoriteList, onCityClick, onLinkClick) => {
  return (
    <>
      {_handleFavoriteScreenDisplay(favoriteList, onCityClick, onLinkClick)}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </>
  );
};

const _handleFavoriteScreenDisplay = (list, onCityClick, onLinkClick) => {
  if (!list.length) {
    return <EmptyFavoriteList />;
  } else {
    return (
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {list.map((it, i) => {
                return <FavoriteLocation
                  onCityClick={onCityClick}
                  favorireCards={list.it}
                  onLinkClick={onLinkClick}
                  key={list[it] + i}
                />;
              })}
            </ul>
          </section>
        </div>
      </main>
    );
  }
};

Favorites.propTypes = {
  favoriteList: PropTypes.array,
  onCityClick: PropTypes.func,
  onLinkClick: PropTypes.func,
};

const EmptyFavoriteList = () => {
  return (
    <main className="page__main page__main--favorites page__main--favorites-empty">
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

const FavoriteLocation = (favorireCards, onCityClick, onLinkClick) => {
  return (
    <>
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#" onClick={onCityClick}>
              <span>Amsterdam</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          {favorireCards.map((it) => {
            return (
              <FavoritePlaceCard
                title={it.title}
                type={it.type}
                price={it.price}
                previewImage={it.preview_image}
                link={it.link}
                rating={it.rating}
                isPremium={it.is_premium}
                onLinkClick={onLinkClick}
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
  favorireCards: PropTypes.array,
  onCityClick: PropTypes.func,
  onLinkClick: PropTypes.func
};

const FavoritePlaceCard = (title, type, price, previewImage, link, onLinkClick) => {
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
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: `80 %`
            }}></span>
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
};

