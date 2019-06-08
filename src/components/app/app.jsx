import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import {Header} from '../header/header.jsx';
import {getAuthorizationStatus} from '../../store/actions';

export class App extends PureComponent {
  render() {
    const {isAuthorizationRequired, user} = this.props;
    return (
      <>
        <Header
          isAuthorizationRequired={isAuthorizationRequired}
          user={user}
        />
        <Main />
      </>
    );
  }
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

App.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isPro: PropTypes.bool
  }),
  // from mapStateToProps
  isAuthorizationRequired: PropTypes.bool,
};

export default connect(
    mapStateToProps
)(App);

