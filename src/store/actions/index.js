import {snakeCaseToCamelCase} from '../../utils';
import history from '../../history';

const ERROR_RESET_TIMEOUT = 6000;

export const LOAD_OFFERS = `LOAD_OFFERS`;
export const UPDATE_OFFER = `UPDATE_OFFER`;
export const REQUIRED_AUTHORIZATION = `REQUIRED_AUTHORIZATION`;
export const SET_USER_DATA = `SET_USER_DATA`;
export const LOAD_FAVORITES = `LOAD_FAVORITES`;
export const RECEIVED_COMMENTS = `RECEIVED_COMMENTS`;
export const NETWORK_ERROR = `NETWORK_ERROR`;
export const NETWORK_ERROR_RESET = `NETWORK_ERROR_RESET`;
export const SET_POST_COMMENT_PROGRESS = `SET_POST_COMMENT_PROGRESS`;
export const UPDATE_COMMENT_FORM = `UPDATE_COMMENT_FORM`;
export const RESET_COMMENT_FORM = `RESET_COMMENT_FORM`;

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

export const updateCommentForm = (fields) => {
  return {
    type: UPDATE_COMMENT_FORM,
    payload: fields
  };
};

export const resetCommentForm = () => {
  return {
    type: RESET_COMMENT_FORM
  };
};

export const setCommentFormLock = (status) => {
  return {
    type: SET_POST_COMMENT_PROGRESS,
    payload: status
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

export const showNetworkErrorMessage = (message) => {
  return {
    type: NETWORK_ERROR,
    payload: {
      message
    },
  };
};

export const resetNetworkErrorMessage = () => {
  return {
    type: NETWORK_ERROR_RESET
  };
};

export const networkError = ({message, displayTimeout = ERROR_RESET_TIMEOUT}) => {
  let errorClearTimeout = null;
  return (dispatch) => {
    dispatch(showNetworkErrorMessage(message));

    if (errorClearTimeout) {
      clearTimeout(errorClearTimeout);
    }

    errorClearTimeout = setTimeout(() => {
      dispatch(resetNetworkErrorMessage());
    }, displayTimeout);
  };
};

export const getOfferList = () => {
  return (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      dispatch(loadOffers(snakeCaseToCamelCase(response.data)));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
    });
  };
};

export const getFavoriteOfferList = () => {
  return (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      dispatch(loadFavorites(snakeCaseToCamelCase(response.data)));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
    });
  };
};

export const fetchComments = (offerId) => {
  return (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`).then((response) => {
      dispatch(updateComments(offerId, snakeCaseToCamelCase(response.data)));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
    });
  };
};

export const postComments = ({offerId, rating, review}) => {
  return (dispatch, getState, api) => {
    dispatch(setCommentFormLock(true));
    return api.post(`/comments/${offerId}`, {rating, comment: review}).then((response) => {
      dispatch(resetCommentForm());
      dispatch(setCommentFormLock(false));
      dispatch(updateComments(offerId, snakeCaseToCamelCase(response.data)));
    }).catch((err) => {
      dispatch(setCommentFormLock(false));
      handleNetworkError({err, dispatch, shouldRedirectToLoginScreen: true});
    });
  };
};

export const checkLogin = (() => {
  return (dispatch, getState, api) => {
    return api.get(`/login`).then((response) => {
      dispatch(setUser(snakeCaseToCamelCase(response.data)));
      dispatch(requiredAuthorization(false));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
    });
  };
});

export const signIn = ({email, password}) => {
  return (dispatch, getState, api) => {
    return api.post(`/login`, {email, password}).then((response) => {
      dispatch(setUser(snakeCaseToCamelCase(response.data)));
      dispatch(requiredAuthorization(false));
    }).catch((err) => {
      handleNetworkError({err, dispatch});
    });
  };
};

export const toggleFavorite = ({hotelId, status}) => {
  return (dispatch, getState, api) => {
    return api.post(`/favorite/${hotelId}/${status}`).then((response) => {
      dispatch(updateOffer(snakeCaseToCamelCase(response.data)));
    }).catch((err) => {
      handleNetworkError({err, dispatch, shouldRedirectToLoginScreen: true});
    });
  };
};

const handleNetworkError = ({err, dispatch, shouldRedirectToLoginScreen = false}) => {
  const response = err.response || null;

  if (response && response.status === 403) {
    dispatch(requiredAuthorization(true));
    if (shouldRedirectToLoginScreen) {
      history.push(`/login`);
    }
  } else if (response && [400, 500].includes(response.status)) {
    const errorMessage = response.data && response.data.error ? response.data.error : `Request failed`;

    dispatch(networkError({message: errorMessage, status: response.status}));
  }
};
