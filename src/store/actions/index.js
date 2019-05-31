// import mockOffers from '../../mocks/offers2';
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

export const getOfferList = () => {
  return (dispatch, getState, api) => {

    // temp solution cos server does not respond
    // setTimeout(() => {
    //   dispatch(loadOffers(mockOffers));
    // }, 2000);

    api.get(`/hotels`).then((response) => {
      dispatch(loadOffers(response.data));
    });
  };
};


