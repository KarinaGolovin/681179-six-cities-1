import {combineReducers} from 'redux';
import offers from './offers/offers';
import comments from './comments/comments';
import user from './user/user';
import notifications from './notifications/notifications';


export default combineReducers({
  offers,
  comments,
  user,
  notifications
});
