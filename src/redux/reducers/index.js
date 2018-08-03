import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import articleReducer from './articleReducer';
import resourceReducer from './resourceReducer';
import mapReducer from './mapReducer';
import adminReducer from './adminReducer';

const store = combineReducers({
  user,
  login,
  articleReducer,
  resourceReducer,
  mapReducer,
  adminReducer
});

export default store;
