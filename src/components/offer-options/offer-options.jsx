import React from 'react';
import PropTypes from 'prop-types';
import {capitalizeFirstLetter} from '../../utils';

export const OfferOptions = ({offerType, offerBedrooms, offerCapacity}) => {
  const options = [
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
      {options.map((optionItem) => {
        return (
          <li className={`property__feature ${optionItem.optionClass}`} key={optionItem.optionClass}>
            {optionItem.optionText}
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
