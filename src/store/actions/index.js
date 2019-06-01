// import mockOffers from '../../mocks/offers2';
export const SET_CURRENT_CITY = `SET_CURRENT_CITY`;
export const LOAD_OFFERS = `LOAD_OFFERS`;
export const REQUIRED_AUTHORIZATION = `REQUIRED_AUTHORIZATION`;

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

export const getAutorizationStatus = (state) => {
  return state.user.isAuthorizationRequired;
};

export const getOfferList = () => {
  return (dispatch, getState, api) => {

    // temp solution cos server does not respond
    // setTimeout(() => {
    //   dispatch(loadOffers(mockOffers));
    // }, 2000);

    return api.get(`/hotels`).then((response) => {
      dispatch(loadOffers(response.data));
    });
  };
};


