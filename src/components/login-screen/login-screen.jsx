import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '../header/header.jsx';
import {SignIn} from '../sign-in/sign-in.jsx';
import {getAuthorizationStatus, signIn} from '../../store/actions';

export function LoginScreen(props) {
  const {isAuthorizationRequired, onSingIn} = props;
  return (
    <>
      <Header
        isAuthorizationRequired={isAuthorizationRequired}
      />
      <SignIn onLogin={onSingIn}/>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: getAuthorizationStatus(state),
  };
};

const mapDispatchToProps = {
  onSingIn: signIn
};

LoginScreen.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  onSingIn: PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);

