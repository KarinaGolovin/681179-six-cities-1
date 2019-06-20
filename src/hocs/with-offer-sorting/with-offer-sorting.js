import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const SORT_TYPE_PRICE_DESC = `to-low`;
const SORT_TYPE_PRICE_ASC = `to-high`;
const SORT_TYPE_RATING_DESC = `top-rated`;

const sortingOptions = [
  {value: `popular`, label: `Popular`},
  {value: `to-high`, label: `Price: low to high`},
  {value: `to-low`, label: `Price: high to low`},
  {value: `top-rated`, label: `Top rated first`},
];

export const withOffersSorting = (Component) => {
  class WithOffersSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        sortingType: `popular`
      };

      this.handleSortTypeChange = this.handleSortTypeChange.bind(this);
    }

    _applyOfferSorting(offers) {
      const {sortingType} = this.state;

      const sortingMethods = {
        [SORT_TYPE_PRICE_ASC]: (offerA, offerB) => offerA.price - offerB.price,
        [SORT_TYPE_PRICE_DESC]: (offerA, offerB) => offerB.price - offerA.price,
        [SORT_TYPE_RATING_DESC]: (offerA, offerB) => offerB.rating - offerA.rating
      };

      if (!sortingMethods[sortingType]) {
        return offers;
      }

      return [...offers].sort(sortingMethods[sortingType]);
    }

    handleSortTypeChange(sortingType) {
      this.setState({
        sortingType
      });
    }

    render() {
      const {currentPlaces, ...restProps} = this.props;

      return <Component
        sortingType={this.state.sortingType}
        sortingOptions={sortingOptions}
        onSortTypeChange={this.handleSortTypeChange}
        currentPlaces={this._applyOfferSorting(currentPlaces)} {...restProps} />;
    }
  }

  WithOffersSorting.propTypes = {
    currentPlaces: PropTypes.arrayOf(PropTypes.object),
    defaultSortingType: PropTypes.string
  };

  return WithOffersSorting;
};

