import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
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
              picture={it.placeImgSrc}
              link={it.link}
              rating={it.rating}
              isPremium={it.isPremium}
              onClick={this._handleClick}
              id={it.id}
              key={it.id}
            />;
          })
        }
      </div>
    );
  }

  _handleClick() {

  }
}

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
};

export default PlacesList;

