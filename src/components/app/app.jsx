import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import {Header} from '../header/header.jsx';
import {SignIn} from '../sign-in/sign-in.jsx';
import {Favorites} from '../favorites/favorites.jsx';
import {getAutorizationStatus, signIn} from '../../store/actions';
import {getFavoriteOffersByCities} from '../../store/reducers';

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSignInVisible: false
    };
  }
  render() {
    return this._showScreen();
  }

  _showScreen() {
    const {isAuthorizationRequired, user, onSingIn, favoriteList} = this.props;
    return (
      <>
        <Header
          isAuthorizationRequired={isAuthorizationRequired}
          onSignClick={() => {
            this.setState({
              isSignInVisible: true
            });
          }}
          // onFavoritesRedirect={() => {
          //   if (!isAuthorizationRequired) {
          //     return (
          //       <>
          //         <Header/>
          //         <Favorites
          //           favoriteList={favoriteList}
          //           onCityClick={() => {}}
          //           onLinkClick={() => {}}
          //         />;
          //       </>
          //     );
          //   }
          //   return this._showScreen();
          // }}
          user={user}
        />
        {this.state.isSignInVisible && !user.id ? <SignIn onLogin={onSingIn} /> : <Main />}
     </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: getAutorizationStatus(state),
    user: {
      id: state.user.id,
      email: state.user.email,
      name: state.user.name,
      avatar: state.user.avatar_url,
      isPro: state.user.is_pro
    },
    // offers: state.offers,
    favoriteList: getFavoriteOffersByCities(state),
  };
};

const mapDispatchToProps = {
  onSingIn: signIn,
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
  favoriteList: PropTypes.array,

  // from mapDispatchToProps
  onSingIn: PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

