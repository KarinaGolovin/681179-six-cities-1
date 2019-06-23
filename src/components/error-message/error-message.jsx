import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export const ErrorMessage = ({message = ``}) => {
  return <div className={`error-message ${message ? `error-message--active` : ``}`}>
    <div className={`error-message__content`}>
      <p className="error-message__text">{message}</p>
    </div>
  </div>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    message: state.notifications ? state.notifications.error.message : null
  };
};

export default connect(mapStateToProps)(ErrorMessage);
