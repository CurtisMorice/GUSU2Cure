import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import articleReducer from './articleReducer';
import resourceReducer from './resourceReducer';

const store = combineReducers({
  user,
  login,
  articleReducer,
  resourceReducer,
});

export default store;
