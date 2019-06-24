import {ActionType} from '../../actions';
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isAuthorizationRequired: action.payload,
      };
    case ActionType.SET_USER_DATA:
      return {
        ...action.payload,
        isAuthorizationRequired: false
      };
  }
  return state;
};

