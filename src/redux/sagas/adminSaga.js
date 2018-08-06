import {put, takeLatest} from 'redux-saga/effects';
import {ADMIN_ACTIONS} from '../actions/adminActions';
import { getAllUsers, getApprovedArticles, getNewArticles , getModifiedArticles} from '../requests/adminRequest';


function* fetchAllUser(action) {
    try {
        let allUsers = yield getAllUsers();
        console.log('in admin saga to get all users', allUsers);
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
        let approvedArticles = yield getApprovedArticles();
        console.log('in admin saga to get approvedArticles:',approvedArticles);
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
        let newArticle = yield getNewArticles();
        console.log('in admin saga to get new articles',newArticle);
        yield put ({
            type: ADMIN_ACTIONS.SET_NEW_ARTICLE,
            payload: newArticle
        })
    }catch (error) {
        console.log('error in admin saga getting new Article ');
    }
}

function* fetchModifiedArticles(action){
    try{
        let modifiedArticle = yield getModifiedArticles();
        console.log('in admin saga to get modified articles',modifiedArticle);
        yield put({
            type: ADMIN_ACTIONS.SET_MODIFIED_ARTICLE,
            payload: modifiedArticle,
        })
    }catch (error) {
        console.log('error in admin saga getting modified Article ');
    }
}

function* adminSaga() {
    yield takeLatest(ADMIN_ACTIONS.FETCH_ALL_USER, fetchAllUser);
    yield takeLatest(ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE, fetchArticlesApproved);
    yield takeLatest(ADMIN_ACTIONS.FETCH_NEW_ARTICLE, fetchNewArticles);
    yield takeLatest(ADMIN_ACTIONS.FETCH_MODIFIED_ARTICLE, fetchModifiedArticles);
}
  
  export default adminSaga;