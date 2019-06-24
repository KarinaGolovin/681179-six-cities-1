import {
  RECEIVED_COMMENTS,
  SET_POST_COMMENT_PROGRESS,
  UPDATE_COMMENT_FORM,
  RESET_COMMENT_FORM
} from '../../actions';

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
    case SET_POST_COMMENT_PROGRESS: {
      return {
        ...state,
        isFormLocked: action.payload
      };
    }
    case RECEIVED_COMMENTS:
      return {
        ...state,
        byOfferId: {
          ...state.byOfferId,
          ...action.payload
        }
      };
    case UPDATE_COMMENT_FORM: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload
        }
      };
    }
    case RESET_COMMENT_FORM: {
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
