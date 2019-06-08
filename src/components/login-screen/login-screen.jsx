import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SignIn} from '../sign-in/sign-in.jsx';
import {signIn} from '../../store/actions';
import PageTemplate from '../page-template/page-template.jsx';

export function LoginScreen(props) {
  const {onSingIn} = props;
  return (
    <PageTemplate>
      <SignIn onLogin={onSingIn}/>
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

