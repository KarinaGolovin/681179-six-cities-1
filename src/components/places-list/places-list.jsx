import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {
          offers.map((it, i) => {
            return <PlaceCard
              title={it.title}
              type={it.type}
              price={it.price}
              picture={it.placeImgSrc}
              link={it.link}
              rating={it.rating}
              isPremium={it.isPremium}
              onClick={() => { }}
              key={i + it.title}
            />;
          })
        }
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.object.isRequired,
};

export default PlacesList;

