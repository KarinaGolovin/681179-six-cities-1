import React from 'react';
import PropTypes from 'prop-types';

export const UserBlock = ({userAvatar, userName, userStatus}) => {
  return (
    <div className="property__host-user user">
      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
        <img className="property__avatar user__avatar" src={`/${userAvatar}`} width="74" height="74" alt="Host avatar"/>
      </div>
      <span className="property__user-name">
        {userName}
      </span>
      {(userStatus) ? <span className="property__user-status">Pro</span> : null}
    </div>
  );
};

UserBlock.propTypes = {
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  userStatus: PropTypes.bool,
}

