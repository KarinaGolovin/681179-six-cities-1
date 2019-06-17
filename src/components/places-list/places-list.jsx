import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

const cardClasses = {
  container: `cities__place-card`,
  imageWrapper: `cities__image-wrapper`
};

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this._handlePictureClick = this._handlePictureClick.bind(this);
    this._onPictureMouseEnter = this._onPictureMouseEnter.bind(this);
    this._onPictureMouseLeave = this._onPictureMouseLeave.bind(this);
    this._handleBookmarkClick = this._handleBookmarkClick.bind(this);
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {
          offers.map((it) => {
            return <PlaceCard
              title={it.title}
              type={it.type}
              price={it.price}
              previewImage={it.preview_image}
              // link={it.link}
              rating={it.rating}
              isPremium={it.is_premium}
              isBookmarked={it.is_favorite}
              onPictureClick={() => {
                // console.log(it.id);
                this._handlePictureClick(it);
              }}
              onBookmarkClick={() => {
                this._handleBookmarkClick(it);
              }}
              onPictureMouseEnter={() => {
                this._onPictureMouseEnter(it);
              }}
              onPictureMouseLeave={() => {
                this._onPictureMouseLeave(it);
              }}
              classes = {cardClasses}
              id={it.id}
              key={it.id}
            />;
          })
        }
      </div>
    );
  }

  _handlePictureClick(card) {
    this.props.onActiveItemChange(card);
    return card;
  }

  _handleBookmarkClick(card) {
    if (!this.props.onBookmarkClick) {
      return;
    }

    this.props.onBookmarkClick({
      hotelId: card.id,
      status: card.is_favorite ? 0 : 1
    });
  }

  _onPictureMouseEnter(card) {
    this.props.onActiveItemChange(card);
  }

  _onPictureMouseLeave() {
    this.props.onActiveItemChange(null);
  }
}

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
  onActiveItemChange: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func,
};

export default PlacesList;

