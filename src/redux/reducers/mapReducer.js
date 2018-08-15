import {combineReducers} from 'redux';
import {MAP_ACTIONS} from '../actions/mapActions';

// {lat: 40, lng: 20}, {lat:10, lng: 90}

const mapReducer = (state=[{}], action) => {  
    switch(action.type) {
        case MAP_ACTIONS.SET_LOCATIONS:
            return action.payload;
        case MAP_ACTIONS.RECENTER:
            return {...state, location: { lat: state.locationReturned.geometry.location.lat, lng: state.locationReturned.geometry.location.lng}}
        default:
            return state; 
    }
}

export default combineReducers({
    mapReducer
})