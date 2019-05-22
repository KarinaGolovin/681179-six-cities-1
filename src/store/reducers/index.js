import {SET_CURRENT_CITY} from '../actions';

const initialState = {
  currentCity: null,
  offers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CITY:
      return Object.assign({}, state, {
        currentCity: action.currentCity
      });
  }

  return state;
};

export function getCurrentCity(state) {
  if (state.currentCity) {
    return state.currentCity;
  }

  return state.offers.length ? state.offers[0].city : null;
}

export function getCityOffers(city, offers) {
  return offers.filter((it) => {
    return it.city === city;
  });
}

export default reducer;
