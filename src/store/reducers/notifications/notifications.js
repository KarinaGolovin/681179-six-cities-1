import {NETWORK_ERROR, NETWORK_ERROR_RESET} from '../../actions';

const initialState = {
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case NETWORK_ERROR_RESET: {
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
