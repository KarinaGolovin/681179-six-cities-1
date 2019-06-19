import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this._handlePictureClick = this._handlePictureClick.bind(this);
    this._onPictureMouseEnter = this._onPictureMouseEnter.bind(this);
    this._onPictureMouseLeave = this._onPictureMouseLeave.bind(this);
    this._handleBookmarkClick = this._handleBookmarkClick.bind(this);
  }

  render() {
    const {offers, cardProps, classes} = this.props;

    return (
      <div className={`places__list ${classes.container || ``}`}>
        {
          offers.map((it) => {
            return <PlaceCard
              title={it.title}
              type={it.type}
              price={it.price}
              previewImage={it.preview_image}
              rating={it.rating}
              isPremium={it.is_premium}
              isBookmarked={it.is_favorite}
              onPictureClick={() => {
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
              id={it.id}
              key={it.id}
              {...cardProps}
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
  cardProps: PropTypes.object,
  classes: PropTypes.shape({
    container: PropTypes.string
  })
};

export default PlacesList;

