import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };

    this._handleClick = this._handleClick.bind(this);
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
    console.log(card);
  }

  _onPictureMouseEnter(card) {
    console.log(`Hover on ` + card);
  }

  _onPictureMouseLeave(card) {
    console.log(`Hover out ` + card);
  }
}

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
};

export default PlacesList;

