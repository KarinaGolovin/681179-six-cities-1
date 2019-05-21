import reducer from './index';

const SET_CURRENT_CITY = `SET_CURRENT_CITY`;
const initialState = {
  currentCity: null,
  offers: []
};

it(`Expect `, () => {
  const expected = {
    currentCity: `Paris`,
    offers: []
  };

  const result = reducer(initialState, {
    type: SET_CURRENT_CITY,
    currentCity: `Paris`
  });

  expect(result).toEqual(expected);
});
