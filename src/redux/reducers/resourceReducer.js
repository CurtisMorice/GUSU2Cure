import {combineReducers} from 'redux';
import {RESOURCE_ACTIONS} from '../actions/resourceActions';

const resource = (state=[], action) => {
    switch(action.type) {
        case RESOURCE_ACTIONS.SHOW_RESOURCES:
            console.log('in resource reducer for GET', action.payload);
            return action.payload;
        case RESOURCE_ACTIONS.POST_RESOURCE:
            console.log('in resource reducer for POST', action.payload);
            return [action.payload]
        case RESOURCE_ACTIONS.DELETE_RESOURCE:
            console.log('in resource reducer for DELETE', action.payload);
            return [action.payload]
        case RESOURCE_ACTIONS.UPDATE_RESOURCE:
            console.log('in resource reducer for PUT', action.payload);
            return [action.payload]
        default:
            return state; 
    }
}

export default combineReducers({
    resource
})