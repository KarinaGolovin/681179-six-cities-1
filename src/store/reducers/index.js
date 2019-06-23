import {
  LOAD_OFFERS,
  REQUIRED_AUTHORIZATION,
  SET_USER_DATA,
  LOAD_FAVORITES,
  RECEIVED_COMMENTS,
  UPDATE_OFFER,
  NETWORK_ERROR,
  NETWORK_ERROR_RESET
} from '../actions';

const initialState = {
  currentCity: null,
  offers: [],
  user: {},
  comments: {},
  isAuthorizationRequired: undefined,
  error: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload || []
      };
    case UPDATE_OFFER:
      return {
        ...state,
        offers: updateOffer(state.offers, action.payload)
      };
    case LOAD_FAVORITES:
      return {
        ...state,
        offers: updateFavoriteOffers(state.offers, action.payload)
      };
    case RECEIVED_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          ...action.payload
        }
      };
    case REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isAuthorizationRequired: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case NETWORK_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case NETWORK_ERROR_RESET: {
      return {
        ...state,
        error: {
          ...initialState.error
        }
      };
    }
  }

  return state;
};

const updateFavoriteOffers = (offersList, favoriteOffers) => {
  return !favoriteOffers.length ? offersList : favoriteOffers.reduce((list, it) => {
    return updateOffer(list, it);
  }, offersList);
};

const updateOffer = (offersList, updatedOffer) => {
  const offerIndex = offersList.findIndex((item) => item.id === updatedOffer.id);

  if (offerIndex === -1) {
    return offersList;
  }

  return [
    ...offersList.slice(0, offerIndex),
    updatedOffer,
    ...offersList.slice(offerIndex + 1),
  ];
};

export function getSelectedCity(cityName, state) {
  if (!cityName) {
    return state.offers.length ? state.offers[0].city.name : undefined;
  }

  return cityName;
}

export function getCoordinatesByCity(state) {
  return state.offers.reduce((result, it) => {
    const cityCoordinates = [it.city.location.latitude, it.city.location.longitude];
    result[it.city.name] = cityCoordinates;
    return result;
  }, {});
}

export function getCityOffers(city = ``, offers) {
  return offers.filter((it) => {
    return it.city.name === city;
  });
}

export function getFavoriteOffersByCities(state) {
  return state.offers.filter((it) => it.is_favorite);
}

export const getAuthorizationStatus = (state) => {
  return state.isAuthorizationRequired;
};

export default reducer;
