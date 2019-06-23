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
import {compose, withProps} from 'recompose';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import PlacesList from '../places-list/places-list.jsx';
import {GalleryBlock} from '../gallery-block/gallery-block.jsx';
import {OfferOptions} from '../offer-options/offer-options.jsx';
import {OfferFeatures} from '../offer-features/offer-features.jsx';
import {OfferPrice} from '../offer-price/offer-price.jsx';
import {OfferHostBlock} from '../offer-host-block/offer-host-block.jsx';

const PlacesListWrapped = withProps({
  classes: {
    container: `near-places__list`
  },
  cardProps: {
    classes: {
      container: `near-places__card`,
      imageWrapper: `near-places__image-wrapper`
    },
    imageHeight: 200,
    imageWidth: 260
  }
})(PlacesList);

export const Offer = ({offer, nearbyPlaces, updateBookmark, onActiveItemChange, activeItem}) => {
  if (!offer) {
    return `Loading...`;
  }
  return (
    <main className="page__main page__main--property">
      <section className="property">
        <GalleryBlock
          images={offer.images}
        />
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
            <OfferOptions
              offerType={offer.type}
              offerBedrooms={offer.bedrooms}
              offerCapacity={offer.max_adults}
            />
            <OfferPrice
              price={offer.price}
            />
            <OfferFeatures
              featureList={offer.goods}
            />
            <OfferHostBlock
              userName={offer.host.name}
              userAvatar={offer.host.avatar_url}
              userStatus={offer.host.is_pro}
              offerDescription={offer.description}
            />
            <Reviews offerId={offer.id} />
          </div>
        </div>
        <Map
          mapClass={`property__map`}
          cityCoords={[offer.city.location.latitude, offer.city.location.longitude]}
          placesList={[offer, ...nearbyPlaces]}
          activePlaceId={activeItem ? activeItem.id : offer.id}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlacesListWrapped
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
    allOffers: state.offers.filter((it) => it.id !== offerId),
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
