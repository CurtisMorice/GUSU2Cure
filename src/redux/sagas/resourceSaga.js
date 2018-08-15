import {put, takeLatest} from 'redux-saga/effects';
import {RESOURCE_ACTIONS} from '../actions/resourceActions';
import {getResources, postResource, deleteResource, putResource} from '../requests/resourceRequests';

function* fetchResources() {
    try {
        let resources = yield getResources();
        yield put({
            type: RESOURCE_ACTIONS.SHOW_RESOURCES,
            payload: resources
        });
    } catch (error) {
        console.log('error in resource saga on GET', error);   
    }
}

function* addResource(action) {
    try {
        let resource = action.payload
        yield postResource(resource);
        yield put ({
            type: RESOURCE_ACTIONS.FETCH_RESOURCES
        })
    } catch (error) {
        console.log('error in resource saga on POST', error); 
    }  
} 

function* removeResource(action) {
    try {
        let id = action.payload
        yield deleteResource(id);
        yield put ({
            type: RESOURCE_ACTIONS.FETCH_RESOURCES
        })
    } catch (error) {
        console.log('error in resource saga on DELETE', error);    
    }   
}

function* updateResource(action) {
    try {
        let resource = action.payload
        let id = action.payload.id
        yield putResource(resource, id);
        yield put ({
            type: RESOURCE_ACTIONS.FETCH_RESOURCES
        })
    } catch (error) {
        console.log('error in resource saga on PUT', error);
    } 
}

function* resourceSaga() {
    yield takeLatest (RESOURCE_ACTIONS.FETCH_RESOURCES, fetchResources)
    yield takeLatest (RESOURCE_ACTIONS.POST_RESOURCE, addResource)
    yield takeLatest (RESOURCE_ACTIONS.DELETE_RESOURCE, removeResource)
    yield takeLatest (RESOURCE_ACTIONS.UPDATE_RESOURCE, updateResource)
  }
  
  export default resourceSaga;