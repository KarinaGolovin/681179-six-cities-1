import React from 'react';
import PropTypes from 'prop-types';
import Offer from '../offer/offer.jsx';
import PageTemplate from '../page-template/page-template.jsx';

export default function OfferScreen(props) {
  return (
    <PageTemplate>
      <Offer />
    </PageTemplate>
  );
}

OfferScreen.propTypes = {

};
