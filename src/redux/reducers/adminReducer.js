import {combineReducers} from 'redux';
import { ADMIN_ACTIONS } from '../actions/adminActions';

const allUser = (state = [], action) => {
    console.log('In the Admin Reducer');
    switch(action.type){
        case ADMIN_ACTIONS.SHOW_ALL_USER:
            console.log('In admin reducer for GET', action.payload);
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    allUser
})