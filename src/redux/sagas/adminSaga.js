import {put, takeLatest} from 'redux-saga/effects';
import {ADMIN_ACTIONS} from '../actions/adminActions';
import {getAllUsers} from '../requests/adminRequest';


function* fetchAllUser(action) {
    try {
        let allUsers = yield getAllUsers(action.payload);
        console.log('in article saga to get all users', allUsers);
        yield put({
            type: ADMIN_ACTIONS.SET_ALL_USER,
            payload: allUsers
        });
    } catch (error) {
        console.log('error in article saga on GET', error);   
    }
}


function* adminSaga() {
    yield takeLatest(ADMIN_ACTIONS.FETCH_ALL_USER, fetchAllUser);
  }
  
  export default adminSaga;