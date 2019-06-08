import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleFavorite} from '../../store/actions';
import {Favorites} from '../favorites/favorites.jsx';
import {getFavoriteOffersByCities} from '../../store/reducers';
import PageTemplate from '../page-template/page-template.jsx';


export function FavoritesScreen(props) {
  const {favoriteList, updateBookmark} = props;
  return (
    <PageTemplate>
      <Favorites favoriteList={favoriteList} onBookmarkClick={updateBookmark} />
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

