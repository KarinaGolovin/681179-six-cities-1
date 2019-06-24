import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

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
              previewImage={it.previewImage}
              rating={it.rating}
              isPremium={it.isPremium}
              isBookmarked={it.isFavorite}
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

  _handleBookmarkClick(card) {
    if (!this.props.onBookmarkClick) {
      return;
    }

    this.props.onBookmarkClick({
      hotelId: card.id,
      status: card.isFavorite ? 0 : 1
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
  offers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    price: PropTypes.number,
    previewImage: PropTypes.string,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isBookmarked: PropTypes.bool,
    isFavorite: PropTypes.bool,
    onPictureMouseEnter: PropTypes.func,
    onPictureMouseLeave: PropTypes.func,
    onBookmarkClick: PropTypes.func,
    id: PropTypes.number,
    classes: PropTypes.object,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    bookmarkSize: PropTypes.oneOf([`big`, `small`])
  })),
  onActiveItemChange: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func,
  cardProps: PropTypes.object,
  classes: PropTypes.shape({
    container: PropTypes.string
  }).isRequired
};

export default PlacesList;

