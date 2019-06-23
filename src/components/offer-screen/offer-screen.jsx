import React from 'react';
import PropTypes from 'prop-types';
import Offer from '../offer/offer.jsx';
import PageTemplate from '../page-template/page-template.jsx';

export default function OfferScreen({offerId}) {
  return (
    <PageTemplate>
      <Offer offerId={offerId} />
    </PageTemplate>
  );
}

OfferScreen.propTypes = {
  activeCard: PropTypes.object,
  offerId: PropTypes.number,
};
