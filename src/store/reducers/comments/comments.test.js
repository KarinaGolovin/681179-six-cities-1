import {updateComments, postComments, updateCommentForm, resetCommentForm, fetchComments, setCommentFormLock, ActionType} from '../../actions';
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
      type: ActionType.RECEIVED_COMMENTS,
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
    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.RECEIVED_COMMENTS,
      payload: {'1': [{test: `Test`}]}
    });
  });
});

it(`Expect that comments list will be updated correctly`, () => {
  const initialState = {
    byOfferId: {
      '1': [{id: 0}]
    }
  };
  const message = updateComments(1, [{id: 1}, {id: 2}]);

  const expectedState = {
    byOfferId: {
      '1': [{id: 1}, {id: 2}]
    }
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect that post in progress state will be updated correctly 1`, () => {
  const initialState = {
    isFormLocked: false
  };
  const message = setCommentFormLock(true);

  const expectedState = {
    isFormLocked: true
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect that post in progress state will be updated correctly 2`, () => {
  const initialState = {
    isFormLocked: true
  };
  const message = setCommentFormLock(false);

  const expectedState = {
    isFormLocked: false
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect comment form updates correctly`, () => {
  const initialState = {
    form: {
      val1: `Test 1`,
      val3: `Test 3`
    }
  };
  const message = updateCommentForm({
    val2: `Test 2`,
    val3: `Test 3 Updated`
  });

  const expectedState = {
    form: {
      val1: `Test 1`,
      val2: `Test 2`,
      val3: `Test 3 Updated`
    }
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect comment form resets correctly`, () => {
  const initialState = {
    form: {
      rating: 5,
      review: `Test review`
    }
  };
  const message = resetCommentForm();

  const expectedState = {
    form: {
      rating: null,
      review: ``,
    }
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});
