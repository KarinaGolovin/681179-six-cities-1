import {snakeCaseToCamelCase} from '../../utils';
import history from '../../history';

const ERROR_RESET_TIMEOUT = 6000;

export const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  UPDATE_OFFER: `UPDATE_OFFER`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_DATA: `SET_USER_DATA`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  RECEIVED_COMMENTS: `RECEIVED_COMMENTS`,
  NETWORK_ERROR: `NETWORK_ERROR`,
  NETWORK_ERROR_RESET: `NETWORK_ERROR_RESET`,
  SET_POST_COMMENT_PROGRESS: `SET_POST_COMMENT_PROGRESS`,
  UPDATE_COMMENT_FORM: `UPDATE_COMMENT_FORM`,
  RESET_COMMENT_FORM: `RESET_COMMENT_FORM`
};

export const loadOffers = (offers) => {
  return {
    type: ActionType.LOAD_OFFERS,
    payload: offers
  };
};

export const loadFavorites = (favorites) => {
  return {
    type: ActionType.LOAD_FAVORITES,
    payload: favorites
  };
};

export const updateComments = (offerId, comments) => {
  return {
    type: ActionType.RECEIVED_COMMENTS,
    payload: {
      [offerId]: comments
    }
  };
};

export const updateCommentForm = (fields) => {
  return {
    type: ActionType.UPDATE_COMMENT_FORM,
    payload: fields
  };
};

export const resetCommentForm = () => {
  return {
    type: ActionType.RESET_COMMENT_FORM
  };
};

export const setCommentFormLock = (status) => {
  return {
    type: ActionType.SET_POST_COMMENT_PROGRESS,
    payload: status
  };
};

export const requiredAuthorization = (status) => {
  return {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  };
};

export const setUser = (user) => {
  return {
    type: ActionType.SET_USER_DATA,
    payload: user,
  };
};

export const updateOffer = (offer) => {
  return {
    type: ActionType.UPDATE_OFFER,
    payload: offer,
  };
};

export const showNetworkErrorMessage = (message) => {
  return {
    type: ActionType.NETWORK_ERROR,
    payload: {
      message
    },
  };
};

export const resetNetworkErrorMessage = () => {
  return {
    type: ActionType.NETWORK_ERROR_RESET
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
