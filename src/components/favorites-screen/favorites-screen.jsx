import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleFavorite} from '../../store/actions';
import Favorites from '../favorites/favorites.jsx';
import {getFavoriteOffersByCities} from '../../store/reducers';
import PageTemplate from '../page-template/page-template.jsx';
import withAuthRedirect from '../../hocs/with-auth-redirect/with-auth-redirect';

const FavoritesWithRedirect = withAuthRedirect({
  notAuthorised: `/login`
})(Favorites);

export function FavoritesScreen(props) {
  const {favoriteList, updateBookmark} = props;
  return (
    <PageTemplate>
      <FavoritesWithRedirect favoriteList={favoriteList} onBookmarkClick={updateBookmark} />
    </PageTemplate>
  );
}

const mapStateToProps = (state) => {
  return {
    favoriteList: getFavoriteOffersByCities(state),
  };
};

const mapDispatchToProps = {
  updateBookmark: toggleFavorite
};

FavoritesScreen.propTypes = {
  favoriteList: PropTypes.array,
  updateBookmark: PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritesScreen);

