import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const user = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return {username: action.user.username, type: action.user.type, id: action.user.id, validated: action.user.validated} || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

// const userType = (state = null, action) => {
//   switch (action.type) {
//     case USER_ACTIONS.SET_USER:
//       return action.user.type || state;
//     case USER_ACTIONS.UNSET_USER:
//       return null;
//     default:
//       return state;
//   }
// };

// const userId = (state = null, action) => {
//   switch (action.type) {
//     case USER_ACTIONS.SET_USER:
//       return action.user.id || state;
//     case USER_ACTIONS.UNSET_USER:
//       return null;
//     default:
//       return state;
//   }
// };

// const validated = (state = null, action) => {
//   switch (action.type) {
//     case USER_ACTIONS.SET_USER:
//       return action.user.validated || state;
//     case USER_ACTIONS.UNSET_USER:
//       return null;
//     default:
//       return state;
//   }
// };

const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  isLoading,
});
