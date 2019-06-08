import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '../header/header.jsx';
import {getAuthorizationStatus, signIn, toggleFavorite} from '../../store/actions';
import {Favorites} from '../favorites/favorites.jsx';
import {getFavoriteOffersByCities} from '../../store/reducers';

export function FavoritesScreen(props) {
  const {isAuthorizationRequired, favoriteList, updateBookmark, user} = props;
  return (
    <>
      <Header
        isAuthorizationRequired={isAuthorizationRequired}
        user={user}
      />
      <Favorites favoriteList={favoriteList} onBookmarkClick={updateBookmark} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: getAuthorizationStatus(state),
    favoriteList: getFavoriteOffersByCities(state),
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
  onSingIn: signIn,
  updateBookmark: toggleFavorite
};

FavoritesScreen.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  onSingIn: PropTypes.func,
  favoriteList: PropTypes.array,
  updateBookmark: PropTypes.func,
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
)(FavoritesScreen);

