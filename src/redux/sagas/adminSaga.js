import {put, takeLatest} from 'redux-saga/effects';
import {ADMIN_ACTIONS} from '../actions/adminActions';
import { getAllUsers, getApprovedArticles, getNewArticles } from '../requests/adminRequest';


function* fetchAllUser(action) {
    try {
        let allUsers = yield getAllUsers(action.payload);
        console.log('in article saga to get all users', allUsers);
        yield put({
            type: ADMIN_ACTIONS.SET_ALL_USER,
            payload: allUsers
        });
    } catch (error) {
        console.log('error in admin saga on GET', error);   
    }
}

function* fetchArticlesApproved(action) {
    try {
        let approvedArticles = yield getApprovedArticles(action.payload);
        console.log(approvedArticles);
        yield put({
            type: ADMIN_ACTIONS.SET_APPROVED_ARTICLE,
            payload: approvedArticles
        })
    } catch (error) {
        console.log('error in admin saga getting approved articles');
    }
}

function* fetchNewArticles(action){
    try {
        let newArticle = yield getNewArticles(action.payload);
        console.log(newArticle);
        yield put ({
            type: ADMIN_ACTIONS.SET_NEW_ARTICLE,
            payload: newArticle
        })
    }catch (error) {
        console.log('error in addmin saga getting new Article ');
    }
}

function* adminSaga() {
    yield takeLatest(ADMIN_ACTIONS.FETCH_ALL_USER, fetchAllUser);
    yield takeLatest(ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE, fetchArticlesApproved);
    yield takeLatest(ADMIN_ACTIONS.FETCH_NEW_ARTICLE, fetchNewArticles);
}
  
  export default adminSaga;