import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import articleReducer from './articleReducer';

const store = combineReducers({
  user,
  login,
  articleReducer,
});

export default store;
