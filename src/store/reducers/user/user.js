import {REQUIRED_AUTHORIZATION, SET_USER_DATA} from '../../actions';
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isAuthorizationRequired: action.payload,
      };
    case SET_USER_DATA:
      return {
        ...action.payload,
        isAuthorizationRequired: false
      };
  }
  return state;
};

