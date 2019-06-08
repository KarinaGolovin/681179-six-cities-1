import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '../header/header.jsx';
import {SignIn} from '../sign-in/sign-in.jsx';
import {getAuthorizationStatus, signIn} from '../../store/actions';

export function LoginScreen(props) {
  const {isAuthorizationRequired, onSingIn, user} = props;
  return (
    <>
      <Header
        isAuthorizationRequired={isAuthorizationRequired}
        user={user}
      />
      <SignIn onLogin={onSingIn}/>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: getAuthorizationStatus(state),
    user: {
      id: state.user.id,
      email: state.user.email,
      name: state.user.name,
      avatar: state.user.avatar_url,
      isPro: state.user.is_pro
    }
  };
};

const mapDispatchToProps = {
  onSingIn: signIn
};

LoginScreen.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  onSingIn: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isPro: PropTypes.bool
  }),
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);

