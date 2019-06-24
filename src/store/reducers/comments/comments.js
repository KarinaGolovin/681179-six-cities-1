import {ActionType} from '../../actions';

const initialState = {
  isFormLocked: false,
  byOfferId: {},
  form: {
    rating: null,
    review: ``,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_POST_COMMENT_PROGRESS: {
      return {
        ...state,
        isFormLocked: action.payload
      };
    }
    case ActionType.RECEIVED_COMMENTS:
      return {
        ...state,
        byOfferId: {
          ...state.byOfferId,
          ...action.payload
        }
      };
    case ActionType.UPDATE_COMMENT_FORM: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload
        }
      };
    }
    case ActionType.RESET_COMMENT_FORM: {
      return {
        ...state,
        form: {
          ...initialState.form
        }
      };
    }
  }

  return state;
};
