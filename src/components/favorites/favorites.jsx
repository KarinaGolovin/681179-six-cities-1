import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {connect} from 'react-redux';
import {getFavoriteOfferList} from '../../store/actions';
import {withProps} from 'recompose';
import {getFavoriteOffersByCities, getFavoritesGroupedWithCities} from '../../store/reducers/offers/selectors';

const PlaceCardWrapped = withProps({
  classes: {
    container: `favorites__card`,
    imageWrapper: `favorites__image-wrapper`,
    cardInfo: `favorites__card-info`
  }
})(PlaceCard);

export class Favorites extends PureComponent {
  componentDidMount() {
    const {loadFavorites = () => {}} = this.props;

    loadFavorites();
  }
  render() {
    const {favoriteList: list, favoritesByCity = [], onCityClick, onBookmarkClick} = this.props;

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
                    {favoritesByCity.map(([city, cards]) => {
                      return <FavoriteLocation
                        city={city}
                        cards={cards}
                        key={city}
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
  }
}

Favorites.propTypes = {
  favoriteList: PropTypes.array,
  favoritesByCity: PropTypes.array,
  onCityClick: PropTypes.func,
  onBookmarkClick: PropTypes.func,
  loadFavorites: PropTypes.func
};

const FavoriteLocation = ({city, cards, onCityClick, onBookmarkClick}) => {
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
              <PlaceCardWrapped
                title={it.title}
                type={it.type}
                price={it.price}
                previewImage={it.preview_image}
                rating={it.rating}
                isPremium={it.is_premium}
                isBookmarked={it.is_favorite}
                onBookmarkClick={() => {
                  onBookmarkClick({
                    hotelId: it.id,
                    status: it.is_favorite ? 0 : 1
                  });
                }}
                id={it.id}
                key={it.id}
                imageWidth={150}
                imageHeight={110}
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
  onBookmarkClick: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    favoriteList: getFavoriteOffersByCities(state),
    favoritesByCity: getFavoritesGroupedWithCities(state)
  };
};

const mapDispatchToProps = {
  loadFavorites: getFavoriteOfferList
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
