import MockAdapter from 'axios-mock-adapter';
import {configureAPI} from '../../../api';
import {
  getOfferList,
  getFavoriteOfferList,
  updateOffer,
  loadFavorites,
  loadOffers,
  ActionType
} from '../../actions';

import reducer from './offers';


it(`Expect correct load offers API call to server`, () => {
  const dispatch = jest.fn();
  const api = configureAPI();
  const mock = new MockAdapter(api);

  mock.onGet(`/hotels`).reply(200, [{
    test: `Test`
  }]);

  return getOfferList()(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.LOAD_OFFERS,
      payload: [{test: `Test`}]
    });
  });
});

it(`Expect correct load favorites API call to server`, () => {
  const dispatch = jest.fn();
  const api = configureAPI();
  const mock = new MockAdapter(api);

  mock.onGet(`/favorite`).reply(200, [{
    test: `Test`
  }]);

  return getFavoriteOfferList()(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.LOAD_FAVORITES,
      payload: [{test: `Test`}]
    });
  });
});

it(`Expect that offer will be updated correctly`, () => {
  const initialState = [
    {id: 0, title: `Test`}
  ];
  const message = updateOffer({
    id: 0,
    title: `Updated`,
    extraField: true
  });

  const expectedState = [{id: 0, title: `Updated`, extraField: true}];

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect that favorites list will be updated correctly`, () => {
  const initialState = [
    {id: 0, title: `Test 1`, favorite: false},
    {id: 1, title: `Test 2`, favorite: false},
    {id: 2, title: `Test 3`, favorite: false},
  ];
  const message = loadFavorites([
    {id: 1, title: `Test 2`, favorite: true},
    {id: 2, title: `Test 3`, favorite: true},
  ]);

  const expectedState = [
    {id: 0, title: `Test 1`, favorite: false},
    {id: 1, title: `Test 2`, favorite: true},
    {id: 2, title: `Test 3`, favorite: true},
  ];

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect that offers list will be loaded correctly`, () => {
  const initialState = [];
  const message = loadOffers([
    {id: 1, title: `Test 2`},
    {id: 2, title: `Test 3`},
  ]);

  const expectedState = [
    {id: 1, title: `Test 2`},
    {id: 2, title: `Test 3`},
  ];

  expect(reducer(initialState, message)).toEqual(expectedState);
});
