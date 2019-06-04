// import mockOffers from '../../mocks/offers2';
export const SET_CURRENT_CITY = `SET_CURRENT_CITY`;
export const LOAD_OFFERS = `LOAD_OFFERS`;
export const REQUIRED_AUTHORIZATION = `REQUIRED_AUTHORIZATION`;
export const SET_USER_DATA = `SET_USER_DATA`;

export const changeCity = (city) => {
  return {
    type: SET_CURRENT_CITY,
    payload: city
  };
};

export const loadOffers = (offers) => {
  return {
    type: LOAD_OFFERS,
    payload: offers
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

export const getAutorizationStatus = (state) => {
  return state.isAuthorizationRequired;
};

export const getOfferList = () => {
  return (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      dispatch(loadOffers(response.data));
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      return err;

      // temp solution cos server does not respond
      // setTimeout(() => {
      //   dispatch(loadOffers(mockOffers));
      // }, 2000);
    });
  };
};

export const signIn = ({email, password}) => {
  return (dispatch, getState, api) => {
    return api.post(`/login`, {email, password}).then((response) => {
      dispatch(setUser(response.data));
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  };
};

// const onLogoutRequest = () => {
//   return api.get(`/logout`)
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log(err)
//     });
// };
