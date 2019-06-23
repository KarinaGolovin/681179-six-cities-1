import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleFavorite} from '../../store/actions';
import Favorites from '../favorites/favorites.jsx';
import PageTemplate from '../page-template/page-template.jsx';
import withAuthRedirect from '../../hocs/with-auth-redirect/with-auth-redirect';

const FavoritesWithRedirect = withAuthRedirect({
  notAuthorised: `/login`
})(Favorites);

export function FavoritesScreen(props) {
  const {updateBookmark} = props;
  return (
    <PageTemplate>
      <FavoritesWithRedirect onBookmarkClick={updateBookmark} />
    </PageTemplate>
  );
}

const mapDispatchToProps = {
  updateBookmark: toggleFavorite
};

FavoritesScreen.propTypes = {
  favoriteList: PropTypes.array,
  updateBookmark: PropTypes.func,
};

export default connect(
    null,
    mapDispatchToProps
)(FavoritesScreen);

