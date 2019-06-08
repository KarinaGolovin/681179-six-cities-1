import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SignIn} from '../sign-in/sign-in.jsx';
import {signIn} from '../../store/actions';
import PageTemplate from '../page-template/page-template.jsx';
import withAuthRedirect from '../../hocs/with-auth-redirect/with-auth-redirect';

const SignInWithRedirect = withAuthRedirect(SignIn, {
  authorized: `/`
});

export function LoginScreen(props) {
  const {onSingIn} = props;
  return (
    <PageTemplate>
      <SignInWithRedirect onLogin={onSingIn}/>
    </PageTemplate>
  );
}

const mapDispatchToProps = {
  onSingIn: signIn
};

LoginScreen.propTypes = {
  onSingIn: PropTypes.func,
};

export default connect(
    null,
    mapDispatchToProps
)(LoginScreen);

