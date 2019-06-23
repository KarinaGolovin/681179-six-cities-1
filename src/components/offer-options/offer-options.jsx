import React from 'react';
import PropTypes from 'prop-types';
import {capitalizeFirstLetter} from '../../utils';

export const OfferOptions = ({offerType, offerBedrooms, offerCapacity}) => {
  const OPTIONS = [
    {
      optionClass: `property__feature--entire`,
      optionText: capitalizeFirstLetter(offerType),
    },
    {
      optionClass: `property__feature--bedrooms`,
      optionText: `${offerBedrooms} Bedrooms`
    },
    {
      optionClass: `property__feature--adults`,
      optionText: `Max ${offerCapacity} adults`
    },
  ];

  return (
    <ul className="property__features">
      {OPTIONS.map((option) => {
        return (
          <li className={`property__feature ${option.optionClass}`} key={option.optionClass}>
            {option.optionText}
          </li>
        );
      })}
    </ul>
  );
};

OfferOptions.propTypes = {
  offerType: PropTypes.string,
  offerBedrooms: PropTypes.number,
  offerCapacity: PropTypes.number,
};
