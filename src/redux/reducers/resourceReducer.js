import {combineReducers} from 'redux';
import {RESOURCE_ACTIONS} from '../actions/resourceActions';

const resource = (state={articles: [],resourcesFetched: false}, action) => {
    switch(action.type) {
        case RESOURCE_ACTIONS.SHOW_RESOURCES:
            return {...state, articles: action.payload, resourcesFetched: true};
        case RESOURCE_ACTIONS.POST_RESOURCE:
            return [action.payload]
        case RESOURCE_ACTIONS.DELETE_RESOURCE:
            return [action.payload]
        case RESOURCE_ACTIONS.UPDATE_RESOURCE:
            return [action.payload]
        default:
            return state; 
    }
}

export default combineReducers({
    resource
})