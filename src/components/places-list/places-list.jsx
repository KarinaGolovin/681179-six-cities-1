import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this._handlePictureClick = this._handlePictureClick.bind(this);
    this._onPictureMouseEnter = this._onPictureMouseEnter.bind(this);
    this._onPictureMouseLeave = this._onPictureMouseLeave.bind(this);
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
              picture={it.picture}
              link={it.link}
              rating={it.rating}
              isPremium={it.isPremium}
              onLinkClick={() => {}}
              onPictureClick={() => {
                this._handlePictureClick(it);
              }}
              onPictureMouseEnter={() => {
                this._onPictureMouseEnter(it);
              }}
              onPictureMouseLeave={() => {
                this._onPictureMouseLeave(it);
              }}
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
};

export default PlacesList;

