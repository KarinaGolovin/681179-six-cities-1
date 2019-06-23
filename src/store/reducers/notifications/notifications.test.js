import {showNetworkErrorMessage, resetNetworkErrorMessage} from '../../actions';
import reducer from './notifications';

it(`Expect that error message will be set correctly`, () => {
  const initialState = {
    error: {}
  };
  const message = showNetworkErrorMessage(`Test Message`);

  const expectedState = {
    error: {
      message: `Test Message`
    }
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});

it(`Expect that error message will be reset correctly`, () => {
  const initialState = {
    error: {
      message: `Reset me`
    }
  };
  const message = resetNetworkErrorMessage();

  const expectedState = {
    error: {}
  };

  expect(reducer(initialState, message)).toEqual(expectedState);
});
