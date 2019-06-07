import {
  SET_CURRENT_CITY,
  LOAD_OFFERS,
  REQUIRED_AUTHORIZATION,
  SET_USER_DATA,
  LOAD_FAVORITES,
  LOAD_COMMENTS,
  UPDATE_OFFER,
} from '../actions';

const initialState = {
  currentCity: null,
  offers: [],
  user: {},
  isAuthorizationRequired: true,
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
    case UPDATE_OFFER:
      return {
        ...state,
        offers: updateOffer(state.offers, action.payload)
      };
    case LOAD_FAVORITES:
      return {
        ...state,
        favorite: action.payload
      };
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isAuthorizationRequired: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...state,
        isAuthorizationRequired: false,
        user: action.payload,
      };
  }

  return state;
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

export function getCurrentCity(state) {
  if (state.currentCity) {
    return state.currentCity;
  }

  return state.offers.length ? state.offers[0].city.name : null;
}

export function getCoordinatesByCity(state) {
  return state.offers.reduce((result, it) => {
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

// Или запрос с сервера???
export function getFavoriteOffersByCities(state) {
  let favoriteOffersList = [];

  state.offers.filter((it) => {
    let favoriteOffers = [];

    if (it.is_favorite) {
      favoriteOffers.push(it);
    }
    return favoriteOffers;
  }).map((it) => {
    // if (!favoriteOffersList[it.city.name]) {
    //   favoriteOffersList.it.city.name = [it];
    // } else {
    favoriteOffersList[it.city.name].push(it);
    // }
  });

  return favoriteOffersList;
}

export default reducer;
