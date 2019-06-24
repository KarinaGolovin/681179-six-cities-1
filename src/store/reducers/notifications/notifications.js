import {ActionType} from '../../actions';

const initialState = {
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.NETWORK_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case ActionType.NETWORK_ERROR_RESET: {
      return {
        ...state,
        error: {
          ...initialState.error
        }
      };
    }
  }
  return state;
};
