import MockAdapter from 'axios-mock-adapter';
import {configureAPI} from '../../api';
import reducer from './index';
import {getOfferList, LOAD_OFFERS} from '../actions';


const SET_CURRENT_CITY = `SET_CURRENT_CITY`;
const initialState = {
  currentCity: null,
  offers: []
};

it(`Expect it return correct value on city change`, () => {
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

it(`Expect correct API call to server`, () => {
  const dispatch = jest.fn();
  const api = configureAPI(jest.fn());
  const mock = new MockAdapter(api);

  mock.onGet(`/hotels`).reply(200, [{
    test: `Test`
  }]);

  return getOfferList(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: LOAD_OFFERS,
      offers: [{test: `Test`}]
    });
  });
});

