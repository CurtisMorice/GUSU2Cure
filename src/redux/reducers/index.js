import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import articleReducer from './articleReducer';
import resourceReducer from './resourceReducer';
import mapReducer from './mapReducer';

const store = combineReducers({
  user,
  login,
  articleReducer,
  resourceReducer,
  mapReducer
});

export default store;
