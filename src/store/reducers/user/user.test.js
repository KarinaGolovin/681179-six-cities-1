import {ActionType, checkLogin, signIn, requiredAuthorization, setUser} from '../../actions';
import reducer from '../user/user';
import {configureAPI} from '../../../api';
import MockAdapter from 'axios-mock-adapter';

it(`Expect user authorization will unset correctly`, () => {
  const initialState = {
    isAuthorizationRequired: true
  };
  const message = requiredAuthorization(false);

  const expectedState = {
    isAuthorizationRequired: false
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect user authorization will be updated correctly`, () => {
  const initialState = {
    isAuthorizationRequired: false
  };
  const message = requiredAuthorization(true);

  const expectedState = {
    isAuthorizationRequired: true
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect user data set correctly`, () => {
  const initialState = {
    isAuthorizationRequired: true
  };
  const message = setUser({
    name: `Tester`,
    avatar: `avatarUrl`
  });

  const expectedState = {
    name: `Tester`,
    avatar: `avatarUrl`,
    isAuthorizationRequired: false
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect that login API call to server changes authorization status`, () => {
  const dispatch = jest.fn();
  const api = configureAPI();
  const mock = new MockAdapter(api);

  mock.onGet(`/login`).reply(200, {
    name: `Tester`
  });

  return checkLogin()(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false
    });
  });
});

it(`Expect that login API call to server changes updates user data`, () => {
  const dispatch = jest.fn();
  const api = configureAPI();
  const mock = new MockAdapter(api);

  mock.onGet(`/login`).reply(200, {
    name: `Tester`
  });

  return checkLogin()(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.SET_USER_DATA,
      payload: {
        name: `Tester`
      }
    });
  });
});

it(`Expect that login API call to server changes authorization status`, () => {
  const dispatch = jest.fn();
  const api = configureAPI();
  const mock = new MockAdapter(api);

  mock.onPost(`/login`).reply(200, {
    name: `Tester`
  });

  return signIn({email: `a@a.com`, password: `password`})(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false
    });
  });
});

it(`Expect that login API call to server changes updates user data`, () => {
  const dispatch = jest.fn();
  const api = configureAPI();
  const mock = new MockAdapter(api);

  mock.onPost(`/login`).reply(200, {
    name: `Tester`
  });

  return signIn({email: `a@a.com`, password: `password`})(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.SET_USER_DATA,
      payload: {
        name: `Tester`
      }
    });
  });
});
