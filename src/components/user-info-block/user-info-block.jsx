import React from 'react';
import PropTypes from 'prop-types';

export const UserInfoBlock = ({avatar, email}) => {
  return (
    <>
      <div className="header__avatar-wrapper user__avatar-wrapper">
        <img className="user__avatar" src={avatar}/>
      </div>
      <span className="header__user-name user__name">{email}</span>
    </>
  );
};

UserInfoBlock.propTypes = {
  email: PropTypes.string,
  avatar: PropTypes.string
};

