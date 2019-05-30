export const SET_CURRENT_CITY = `SET_CURRENT_CITY`;
export const LOAD_OFFERS = `LOAD_OFFERS`;

export const changeCity = (city) => {
  return {
    type: SET_CURRENT_CITY,
    currentCity: city
  };
};

export const loadOffers = (offers) => {
  return {
    type: LOAD_OFFERS,
    offers
  };
};

export const getOfferList = (dispatch, getState, api) => {
  api.get(`/hotels`).then((response) => {
    dispatch(loadOffers(response.data));
  });
};


