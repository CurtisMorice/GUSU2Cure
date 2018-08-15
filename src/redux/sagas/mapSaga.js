import {put, takeLatest} from 'redux-saga/effects';
import {MAP_ACTIONS} from '../actions/mapActions';
import {getLocations} from '../requests/mapRequests';

function* fetchLocations(action) {    
    try {
        let locations = yield getLocations(action);
        console.log('in map saga to get locations', locations);
        yield put({
            type: MAP_ACTIONS.SET_LOCATIONS,
            payload: locations
        });
    } catch (error) {
        console.log('error in map saga on GET', error);    
    }
}

function* mapSaga() {
    yield takeLatest (MAP_ACTIONS.FETCH_LOCATIONS, fetchLocations)
  }
  
  export default mapSaga;