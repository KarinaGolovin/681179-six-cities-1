import {RECEIVED_COMMENTS} from '../../actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_COMMENTS:
      return {
        ...state,
        ...action.payload
      };
  }

  return state;
};
