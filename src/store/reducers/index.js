import {SET_CURRENT_CITY, LOAD_OFFERS, REQUIRED_AUTHORIZATION} from '../actions';

const initialState = {
  currentCity: null,
  offers: [],
  user: {},
  isAuthorizationRequired: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CITY:
      return {
        ...state,
        currentCity: action.payload
      };
    case LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload || []
      };
    case REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isAuthorizationRequired: action.payload,
      };
  }

  return state;
};

export function getCurrentCity(state) {
  if (state.currentCity) {
    return state.currentCity;
  }

  return state.offers.length ? state.offers[0].city.name : null;
}

export function getCoordinatesByCity(state) {
  state.offers.reduce((result, it) => {
    const cityCoordinates = [it.city.location.latitude, it.city.location.longitude];
    result[it.city.name] = cityCoordinates;
    return result;
  }, {});
}

export function getCityOffers(city, offers) {
  return offers.filter((it) => {
    return it.city.name === city;
  });
}

export default reducer;
