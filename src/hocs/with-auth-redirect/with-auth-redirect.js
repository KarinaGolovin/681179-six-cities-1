import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../store/actions';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withAuthRedirect = (Component, path = {}) => {
  function WithAuthRedirect(props) {
    if (props.isAuthorizationRequired === undefined) {
      return null;
    }

    if (!props.isAuthorizationRequired && path.authorized) {
      return <Redirect to={path.authorized} />;
    }

    if (props.isAuthorizationRequired && path.notAuthorised) {
      return <Redirect to={path.notAuthorised} />;
    }

    return <Component {...props} />;
  }

  WithAuthRedirect.propTypes = {
    isAuthorizationRequired: PropTypes.bool
  };

  return WithAuthRedirect;
};

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: getAuthorizationStatus(state),
  };
};

export default compose(
    connect(mapStateToProps),
    withAuthRedirect
);
