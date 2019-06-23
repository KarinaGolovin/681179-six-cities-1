import {createSelector} from "reselect";

export const getOffers = (state) => state.offers;

export const getSelectedCity = createSelector(
    [getOffers, (_state, cityName) => cityName],
    (state, cityName) => {
      if (!cityName) {
        return state.length ? state[0].city.name : undefined;
      }
      return cityName;
    },
);

export const getCoordinatesByCity = createSelector(
    [getOffers],
    (state) => {
      return state.reduce((result, it) => {
        const cityCoordinates = [it.city.location.latitude, it.city.location.longitude];
        result[it.city.name] = cityCoordinates;
        return result;
      }, {});
    }
);

export const getCityOffers = createSelector(
    [getOffers, (_state, cityName) => cityName],
    (state, city) => {
      return state.filter((it) => it.city.name === city);
    }
);

export const getFavoriteOffersByCities = createSelector(
    [getOffers],
    (state) => {
      return state.offers.filter((it) => it.is_favorite);
    }
);
