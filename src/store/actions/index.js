import history from '../../history';

export const LOAD_OFFERS = `LOAD_OFFERS`;
export const UPDATE_OFFER = `UPDATE_OFFER`;
export const REQUIRED_AUTHORIZATION = `REQUIRED_AUTHORIZATION`;
export const SET_USER_DATA = `SET_USER_DATA`;
export const LOAD_FAVORITES = `LOAD_FAVORITES`;
export const LOAD_COMMENTS = `LOAD_COMMENTS`;

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

export const loadComments = (comments) => {
  return {
    type: LOAD_COMMENTS,
    payload: comments
  };
};

export const requiredAutorization = (status) => {
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

export const getComments = (hotelId) => {
  return (dispatch, getState, api) => {
    return api.get(`/comments/:${hotelId}`).then((response) => {
      dispatch(loadComments(response.data));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
    });
  };
};

export const checkLogin = (() => {
  return (dispatch, getState, api) => {
    return api.get(`/login`).then((response) => {
      dispatch(setUser(response.data));
      dispatch(requiredAutorization(false));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
      // dispatch(requiredAutorization(true));
    });
  };
});

export const signIn = ({email, password}) => {
  return (dispatch, getState, api) => {
    return api.post(`/login`, {email, password}).then((response) => {
      dispatch(setUser(response.data));
      dispatch(requiredAutorization(false));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
      // dispatch(requiredAutorization(true));
      // return err;
    });
  };
};

export const toggleFavorite = ({hotelId, status}) => {
  return (dispatch, getState, api) => {
    return api.post(`/favorite/${hotelId}/${status}`).then((response) => {
      dispatch(updateOffer(response.data));
    }).catch((err) => {
      handleNetworkError({err, dispatch, shouldRediectToLoginScreen: true});
    });
  };
};

export const postComments = ({hotelId}) => {
  return (dispatch, getState, api) => {
    return api.post(`/comments/:${hotelId}`).then((response) => {
      // eslint-disable-next-line no-console
      console.log(response);
      // форма очищается
    }).catch((err) => {
      handleNetworkError({err, dispatch, shouldRediectToLoginScreen: true});
      // на ошибку кнопка submit Form разблокируется, форма очищается, отрисовать ошибку
    });
  };
};

const handleNetworkError = ({err, dispatch, shouldRediectToLoginScreen = false}) => {
  if (err.response && err.response.status === 403) {
    dispatch(requiredAutorization(true));
    if (shouldRediectToLoginScreen) {
      history.push(`/login`);
    }
  } else if (err.response && err.response.status === 400) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
