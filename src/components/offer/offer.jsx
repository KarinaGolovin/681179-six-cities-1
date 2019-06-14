import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {ReviewForm} from '../reviews-form/review-form.jsx';
import {Rating} from '../rating/rating.jsx';
import {postComments} from '../../store/actions';

export const Offer = ({offer, comments, nearbyPlaces, submitRating}) => {
  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.map((image) => {
              return (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Photo studio" />
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
              {/* вынести  bookmark */}
              <button className="property__bookmark-button button" type="button" onClick={}>
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <Rating
              rating={offer.rating}
              classes={{
                container: `property__rating`,
                stars: `property__stars`,
                value: `property__rating-value`
              }}
          />
            {/* <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{
                  width: `96 %`,
                }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div> */}
            {/* Проверка окончаний */}
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
                {offer.goods.map((it) => {
                  return (
                    <li className="property__inside-item" key={it}>
                      {it}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={offer.host.avatar_url} width="74" height="74" alt="Host avatar" />
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
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
              <ul className="reviews__list">
                {comments.map((it) => {
                  return (
                    <li className="reviews__item" key={it}>
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src={it.user.avatar_url} width="54" height="54" alt="Reviews avatar" />
                        </div>
                        <span className="reviews__user-name">{it.user.name}</span>
                      </div>
                      <div className="reviews__info">
                        <Rating
                          rating={it.rating}
                          classes={{
                            container: `reviews__rating`,
                            stars: `reviews__stars`
                          }}
                        />
                        {/* <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{
                              width: it.rating * 100 / 5,
                            }}/>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div> */}
                        <p className="reviews__text">{it.comment}</p>
                        <time className="reviews__time" dateTime={it.date}>{formatDate(it.date, short)}</time>
                        {/* <time className="reviews__time" datetime="2019-04-24">April 2019</time> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <ReviewForm
                onSubmitRating={submitRating}
              />
            </section>
          </div>
        </div>
        <section className="property__map map"/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearbyPlaces.map((it) => {
              return <PlaceCard key={it} />;
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

const formatDate = (dateString, format) => {
  const date = new Date(dateString);
  const options = {
    short: {
      month: 'long',
      year: 'numeric'
    },
  };

  return date.toLocaleDateString('en_US', options[format]);
};

const mapStateToProps = () => {
};

const mapDispatchToProps = {
  submitRating: postComments
};

Offer.propTypes = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Offer);
