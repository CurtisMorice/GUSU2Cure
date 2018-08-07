import {combineReducers} from 'redux';
import {MAP_ACTIONS} from '../actions/mapActions';

const mapReducer = (state={locations: [{research_institution:'meowmeow'}]}, action) => {  
    
    console.log('state in mapReducer',state);
    switch(action.type) {
        case MAP_ACTIONS.SET_LOCATIONS:
            console.log('in mapReducer with payload', action.payload);
            return {...state, locations: [...action.payload]};
        case MAP_ACTIONS.RECENTER:
            return {...state, location: { lat: state.locationReturned.geometry.location.lat, lng: state.locationReturned.geometry.location.lng}}
        default:
            return state; 
    }
}

export default combineReducers({
    mapReducer
})