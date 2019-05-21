export const SET_CURRENT_CITY = `SET_CURRENT_CITY`;

export const changeCity = (city) => {
  return {
    type: SET_CURRENT_CITY,
    currentCity: city
  };
};


