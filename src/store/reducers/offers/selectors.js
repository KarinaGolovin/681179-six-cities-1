import {createSelector} from "reselect";
import {shuffleArray} from '../../../utils';

const MAX_NEARBY_OFFERS_TO_DISPLAY = 3;

export const getOffers = (state) => {
  return state.offers;
};

export const filterOffersByCity = (offers, city) => {
  return offers.filter((it) => it.city.name === city);
};

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
        result[it.city.name] = [it.city.location.latitude, it.city.location.longitude];
        return result;
      }, {});
    }
);

export const getCityOffers = createSelector(
    [getOffers, (_state, cityName) => cityName],
    filterOffersByCity
);

export const getFavoriteOffersByCities = createSelector(
    [getOffers],
    (state) => {
      return state.filter((it) => it.isFavorite);
    }
);

export const getOfferById = createSelector(
    [
      getOffers,
      (_state, offerId) => offerId],
    (state, offerId) => {
      return state.find((it) => it.id === offerId);
    }
);

export const getNearbyPlaces = (() => {
  // Need it to not reload all nearby places on bookmark status change
  const cache = {};

  return createSelector(
      [
        getOffers,
        getOfferById,
      ],
      (state, currentOffer) => {
        if (!currentOffer) {
          return [];
        }

        const cityOffers = filterOffersByCity(state, currentOffer.city.name);
        const filteredOffers = cityOffers.filter(({id}) => id !== currentOffer.id);

        if (!cache[currentOffer.id]) {
          cache[currentOffer.id] = shuffleArray(filteredOffers).slice(0, MAX_NEARBY_OFFERS_TO_DISPLAY).map((it) => it.id);
        }

        return cityOffers.filter((it) => cache[currentOffer.id].includes(it.id));
      },
  );
})();

export const groupByCity = (offers) => {
  return offers.reduce((byCity, it) => {
    if (!byCity[it.city.name]) {
      byCity[it.city.name] = [];
    }
    byCity[it.city.name].push(it);
    return byCity;
  }, {});
};

export const getFavoritesGroupedWithCities = createSelector(
    [getFavoriteOffersByCities],
    (state) => {
      return Object.entries(groupByCity(state));
    }
);
