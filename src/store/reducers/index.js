const initialState = {
  currentCity: ``,
  currentPlaces: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CITY_CHANGE`:
      return Object.assign({}, state, {
        currentCity: state.currentCity
      });
    case `SET_OFFER_LIST`:
      return Object.assign({}, state, {
        places: state.places,
      });
  }

  return state;
};

export default reducer;
