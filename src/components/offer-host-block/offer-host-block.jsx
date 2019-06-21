import React from 'react';
import PropTypes from 'prop-types';
import {UserBlock} from '../user-block/user-block.jsx';

export const OfferHostBlock = ({userAvatar, userName, userStatus, offerDescription}) => {
  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <UserBlock
        userAvatar={userAvatar}
        userName={userName}
        userStatus={userStatus}
      />
      <div className="property__description">
        <p className="property__text">
          {offerDescription}
        </p>
      </div>
    </div>
  );
};

OfferHostBlock.propTypes = {
  userName: PropTypes.string,
  userAvatar: PropTypes.string,
  userStatus: PropTypes.bool,
  offerDescription: PropTypes.string,
}
