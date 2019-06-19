import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Rating} from '../rating/rating.jsx';
import {toggleFavorite} from '../../store/actions';
import {BookmarkIcon} from '../bookmark-icon/bookmark-icon.jsx';
import Reviews from '../reviews/reviews.jsx';
import Map from '../map/map.jsx';
import {getCityOffers} from '../../store/reducers';
import {shuffleArray} from '../../utils';
import {compose} from 'recompose';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import PlacesList from '../places-list/places-list.jsx';

const placesListClasses = {
  container: `near-places__list`
};

const placeCardProps = {
  classes: {
    container: `near-places__card`,
    imageWrapper: `near-places__image-wrapper`
  },
  imageHeight: 200,
  imageWidth: 260
};

export const Offer = ({offer, nearbyPlaces, updateBookmark, onActiveItemChange, activeItem}) => {
  if (!offer) {
    return `Loading...`;
  }
  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.map((image) => {
              return (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Photo studio"/>
                </div>
              );
            })}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {(offer.is_premium) ? <div className="property__mark"><span>Premium</span></div> : null}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
              </h1>
              <BookmarkIcon
                isBookmarked={offer.is_favorite}
                onBookmarkClick={() => {
                  updateBookmark({
                    hotelId: offer.id,
                    status: offer.is_favorite ? 0 : 1
                  });
                }}
                bookmarkClass={`property`}
                sizeKey={`big`}
              />
            </div>
            <Rating
              rating={offer.rating}
              classes={{
                container: `property__rating`,
                stars: `property__stars`,
                value: `property__rating-value`
              }}
            />
            {/* TODO check ending */}
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.max_adults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((featureName) => {
                  return (
                    <li className="property__inside-item" key={featureName}>
                      {featureName}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={`/${offer.host.avatar_url}`} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                {(offer.host.is_pro) ? <span className="property__user-status">Pro</span> : null}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <Reviews offerId={offer.id} />
          </div>
        </div>
        <Map
          mapClass={`property__map`}
          cityCoords={[offer.city.location.latitude, offer.city.location.longitude]}
          placesList={nearbyPlaces}
          activePlaceId={activeItem ? activeItem.id : null}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlacesList
            cardProps={placeCardProps}
            classes={placesListClasses}
            offers={nearbyPlaces}
            onBookmarkClick={updateBookmark}
            onActiveItemChange={onActiveItemChange}
          />
        </section>
      </div>
    </main>
  );
};

const getRandomNearbyPlacesIds = (() => {
  const cache = {};

  return ({allOffers, currentOffer}) => {
    if (!currentOffer) {
      return [];
    }

    if (!cache[currentOffer.id]) {
      const cityOffers = getCityOffers(currentOffer.city.name, allOffers);
      const filteredOffers = cityOffers.filter(({id}) => id !== currentOffer.id);

      cache[currentOffer.id] = shuffleArray(filteredOffers).slice(0, 3).map((it) => it.id);
    }

    return cache[currentOffer.id];
  };
})();

const mapStateToProps = (state, {offerId}) => {
  const offer = state.offers.find((it) => it.id === offerId);
  const nearbyPlacesIds = getRandomNearbyPlacesIds({
    currentOffer: offer,
    allOffers: state.offers
  });

  return {
    offer,
    nearbyPlaces: state.offers.filter(({id}) => nearbyPlacesIds.includes(id)),
  };
};

const mapDispatchToProps = {
  updateBookmark: toggleFavorite,
};

Offer.propTypes = {
  updateBookmark: PropTypes.func,
  offer: PropTypes.object,
  nearbyPlaces: PropTypes.array,
  onActiveItemChange: PropTypes.func,
  activeItem: PropTypes.object
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withActiveItem
)(Offer);
