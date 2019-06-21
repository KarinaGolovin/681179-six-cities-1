import React from 'react';
import PropTypes from 'prop-types';

export const OfferFeatures = ({featureList}) => {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {featureList.map((feature) => {
          return (
            <li className="property__inside-item" key={feature}>
              {feature}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

OfferFeatures.propTypes = {
  featureList: PropTypes.array,
}
