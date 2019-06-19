import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PlaceCard from '../place-card/place-card.jsx';
import {Rating} from '../rating/rating.jsx';
import {toggleFavorite} from '../../store/actions';
import {BookmarkIcon} from '../bookmark-icon/bookmark-icon.jsx';
import Reviews from '../reviews/reviews.jsx';
import Map from '../map/map.jsx';
import {getCityOffers} from '../../store/reducers';
import {shuffleArray} from '../../utils';

const cardClasses = {
  container: `near-places__card`,
  imageWrapper: `near-places__image-wrapper`
};

export const Offer = ({offer, nearbyPlaces, updateBookmark}) => {
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
            <div className="property__mark">
              {(offer.is_premium) ? <span>Premium</span> : null}
            </div>
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
          activePin
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {(nearbyPlaces).map((it) => {
              return <PlaceCard
                title={it.title}
                type={it.type}
                price={it.price}
                previewImage={it.preview_image}
                rating={it.rating}
                isPremium={it.is_premium}
                isBookmarked={it.is_favorite}
                onPictureClick={() => {
                }}
                onBookmarkClick={() => {
                  updateBookmark({
                    hotelId: it.id,
                    status: it.is_favorite ? 0 : 1
                  });
                }}
                onPictureMouseEnter={() => {
                }}
                onPictureMouseLeave={() => {
                }}
                classes={cardClasses}
                id={it.id}
                key={it.id}
                imageWidth={260}
                imageHeight={200}
              />;
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

const getCityFromOffer = (offer) => {
  if (!offer) {
    return null;
  }

  return offer.city.name;
}

const mapStateToProps = (state, {offerId}) => {
  const offer = state.offers.find((it) => it.id === offerId);

  return {
    offer,
    // TODO add offer pin on map, orange
    nearbyPlaces: shuffleArray(getCityOffers(getCityFromOffer(offer), state.offers)).slice(0, 3),
  };
};

const mapDispatchToProps = {
  updateBookmark: toggleFavorite,
};

Offer.propTypes = {
  updateBookmark: PropTypes.func,
  offer: PropTypes.object,
  nearbyPlaces: PropTypes.array,

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Offer);
