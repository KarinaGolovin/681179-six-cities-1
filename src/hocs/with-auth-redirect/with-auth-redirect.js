import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../store/reducers/user/selectors';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

export const withAuthRedirect = (path = {}) => (Component) => {
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

export default (path) => {
  return compose(
      connect(mapStateToProps),
      withAuthRedirect(path)
  );
};
