import {RECEIVED_COMMENTS, SET_POST_COMMENT_PROGRESS} from '../../actions';

const initialState = {
  isPostInProgress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POST_COMMENT_PROGRESS: {
      return {
        ...state,
        isPostInProgress: action.payload
      };
    }
    case RECEIVED_COMMENTS:
      return {
        ...state,
        ...action.payload
      };
  }

  return state;
};
