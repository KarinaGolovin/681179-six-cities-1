import {ActionType} from '../../actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return action.payload || [];
    case ActionType.UPDATE_OFFER:
      return updateOffer(state, action.payload);
    case ActionType.LOAD_FAVORITES:
      return updateFavoriteOffers(state, action.payload);
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

