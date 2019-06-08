import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

export const Favorites = ({favoriteList: list, onCityClick, onLinkClick, onBookmarkClick}) => {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
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
      </div>
    </main>
  );
};

Favorites.propTypes = {
  favoriteList: PropTypes.array,
  onCityClick: PropTypes.func,
  onLinkClick: PropTypes.func,
  onBookmarkClick: PropTypes.func,
};

const cardClasses = {
  container: `favorites__card`,
  imageWrapper: `favorites__image-wrapper`,
  cardInfo: `favorites__card-info`
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
              <PlaceCard
                title={it.title}
                type={it.type}
                price={it.price}
                previewImage={it.preview_image}
                link={it.link}
                rating={it.rating}
                isPremium={it.is_premium}
                isBookmarked={it.is_favorite}
                onLinkClick={onLinkClick}
                onPictureClick={() => {}}
                onBookmarkClick={() => {
                  onBookmarkClick({
                    hotelId: it.id,
                    status: it.is_favorite ? 0 : 1
                  });
                }}
                onPictureMouseEnter={() => {}}
                onPictureMouseLeave={() => {}}
                classes = {cardClasses}
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

const groupByCity = (offers) => {
  return offers.reduce((byCity, it) => {
    if (!byCity[it.city.name]) {
      byCity[it.city.name] = [];
    }
    byCity[it.city.name].push(it);
    return byCity;
  }, {});
};
