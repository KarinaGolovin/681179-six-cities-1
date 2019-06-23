import {updateComments, postComments, fetchComments, RECEIVED_COMMENTS} from '../../actions';
import reducer from './comments';
import {configureAPI} from '../../../api';
import MockAdapter from 'axios-mock-adapter';

it(`Expect correct load comments API call to server`, () => {
  const dispatch = jest.fn();
  const api = configureAPI();
  const mock = new MockAdapter(api);

  mock.onGet(`/comments/1`).reply(200, [{
    test: `Test`
  }]);

  return fetchComments(1)(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: RECEIVED_COMMENTS,
      payload: {'1': [{test: `Test`}]}
    });
  });
});

it(`Expect correct post comments API call to server`, () => {
  const dispatch = jest.fn();
  const api = configureAPI();
  const mock = new MockAdapter(api);

  mock.onPost(`/comments/1`).reply(200, [{
    test: `Test`
  }]);

  return postComments({offerId: 1, rating: 5, review: `Test`})(dispatch, jest.fn(), api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: RECEIVED_COMMENTS,
      payload: {'1': [{test: `Test`}]}
    });
  });
});

it(`Expect that comments list will be updated correctly`, () => {
  const initialState = {
    '1': [{id: 0}]
  };
  const message = updateComments(1, [{id: 1}, {id: 2}]);

  const expectedState = {
    '1': [{id: 1}, {id: 2}]
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});
