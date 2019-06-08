import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import {Header} from '../header/header.jsx';
import {Favorites} from '../favorites/favorites.jsx';
import {getAuthorizationStatus, toggleFavorite} from '../../store/actions';
import {getFavoriteOffersByCities} from '../../store/reducers';
import history from '../../history';

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFavoritesVisible: false
    };
  }
  render() {
    return this._showScreen();
  }

  _showScreen() {
    const {isAuthorizationRequired, user, favoriteList, updateBookmark} = this.props;
    return (
      <>
        <Header
          isAuthorizationRequired={isAuthorizationRequired}
          onFavoritesRedirect={() => {
            this.setState({
              isFavoritesVisible: !this.state.isFavoritesVisible && !isAuthorizationRequired
            });
          }}
          user={user}
        />
        {this.state.isFavoritesVisible ? <Favorites favoriteList={favoriteList} onBookmarkClick={updateBookmark} /> : null}
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
    },
    favoriteList: getFavoriteOffersByCities(state),
  };
};

const mapDispatchToProps = {
  updateBookmark: toggleFavorite
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
  updateBookmark: PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

