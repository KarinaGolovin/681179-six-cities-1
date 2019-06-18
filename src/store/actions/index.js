import history from '../../history';

export const LOAD_OFFERS = `LOAD_OFFERS`;
export const UPDATE_OFFER = `UPDATE_OFFER`;
export const REQUIRED_AUTHORIZATION = `REQUIRED_AUTHORIZATION`;
export const SET_USER_DATA = `SET_USER_DATA`;
export const LOAD_FAVORITES = `LOAD_FAVORITES`;
export const RECEIVED_COMMENTS = `RECEIVED_COMMENTS`;

export const loadOffers = (offers) => {
  return {
    type: LOAD_OFFERS,
    payload: offers
  };
};

export const loadFavorites = (favorites) => {
  return {
    type: LOAD_FAVORITES,
    payload: favorites
  };
};

export const updateComments = (offerId, comments) => {
  return {
    type: RECEIVED_COMMENTS,
    payload: {
      [offerId]: comments
    }
  };
};

export const requiredAuthorization = (status) => {
  return {
    type: REQUIRED_AUTHORIZATION,
    payload: status,
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER_DATA,
    payload: user,
  };
};

export const updateOffer = (offer) => {
  return {
    type: UPDATE_OFFER,
    payload: offer,
  };
};

export const getOfferList = () => {
  return (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      dispatch(loadOffers(response.data));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
    });
  };
};

export const getFavoriteOfferList = () => {
  return (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      dispatch(loadFavorites(response.data));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
    });
  };
};

export const fetchComments = (offerId) => {
  return (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`).then((response) => {
      dispatch(updateComments(offerId, response.data));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
    });
  };
};

export const checkLogin = (() => {
  return (dispatch, getState, api) => {
    return api.get(`/login`).then((response) => {
      dispatch(setUser(response.data));
      dispatch(requiredAuthorization(false));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
      // dispatch(requiredAuthorization(true));
    });
  };
});

export const signIn = ({email, password}) => {
  return (dispatch, getState, api) => {
    return api.post(`/login`, {email, password}).then((response) => {
      dispatch(setUser(response.data));
      dispatch(requiredAuthorization(false));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
      // dispatch(requiredAuthorization(true));
      // return err;
    });
  };
};

export const toggleFavorite = ({hotelId, status}) => {
  return (dispatch, getState, api) => {
    return api.post(`/favorite/${hotelId}/${status}`).then((response) => {
      dispatch(updateOffer(response.data));
    }).catch((err) => {
      handleNetworkError({err, dispatch, shouldRedirectToLoginScreen: true});
    });
  };
};

export const postComments = ({offerId, rating, review}) => {
  return (dispatch, getState, api) => {
    return api.post(`/comments/${offerId}`, {rating, comment: review}).then((response) => {
      // eslint-disable-next-line no-console
      console.log(response);
      dispatch(updateComments(offerId, response.data));
      // форма очищается
    }).catch((err) => {
      handleNetworkError({err, dispatch, shouldRedirectToLoginScreen: true});
      // на ошибку кнопка submit Form разблокируется, форма очищается, отрисовать ошибку
    });
  };
};

const handleNetworkError = ({err, dispatch, shouldRedirectToLoginScreen = false}) => {
  if (err.response && err.response.status === 403) {
    dispatch(requiredAuthorization(true));
    if (shouldRedirectToLoginScreen) {
      history.push(`/login`);
    }
  } else if (err.response && err.response.status === 400) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
