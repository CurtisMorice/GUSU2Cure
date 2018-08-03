import {combineReducers} from 'redux';
import {MAP_ACTIONS} from '../actions/mapActions';

const mapReducer = (state={location: null}, action) => {
    switch(action.type) {
        case MAP_ACTIONS.SET_ADDRESS:
            console.log('in mapReducer with payload', action.payload);
            return {...state, locationReturned: {...action.payload}};
        case MAP_ACTIONS.RECENTER:
            return {...state, location: { lat: state.locationReturned.geometry.location.lat, lng: state.locationReturned.geometry.location.lng}}
        default:
            return state; 
    }
}

export default combineReducers({
    mapReducer
})