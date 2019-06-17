import React from 'react';
import {connect} from 'react-redux';
import PlaceCard from '../place-card/place-card.jsx';
import {Rating} from '../rating/rating.jsx';
import {postComments, toggleFavorite} from '../../store/actions';
import {BookmarkIcon} from '../bookmark-icon/bookmark-icon.jsx';
import Reviews from '../reviews/reviews.jsx';

const cardClasses = {
  container: `near-places__card`,
  imageWrapper: `near-places__image-wrapper`
};

export const Offer = ({offer, nearbyPlaces, updateBookmark, sendComment}) => {
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
        <section className="property__map map"/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearbyPlaces.map((it) => {
              return <PlaceCard
                title={it.title}
                type={it.type}
                price={it.price}
                previewImage={it.preview_image}
                link={it.link}
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
      {/*<button className="reviews__submit form__submit button" type="submit" onClick={(evt) => {*/}
      {/*  evt.preventDefault();*/}
      {/*  sendComment({*/}
      {/*    offerId: offer.id,*/}
      {/*    rating: 4,*/}
      {/*    comment: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`*/}
      {/*  });*/}
      {/*}}>Submit</button>*/}
    </main>
  );
};

const mapStateToProps = (state, {offerId}) => {
  const offer = state.offers.find((it) => it.id === offerId);

  return {
    offer,
    // TODO get random offers
    nearbyPlaces: state.offers.slice(0, 3)
  };
};

const mapDispatchToProps = {
  updateBookmark: toggleFavorite,
  sendComment: postComments,
};

Offer.propTypes = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Offer);
