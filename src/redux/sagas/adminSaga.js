import {put, takeLatest} from 'redux-saga/effects';
import {ADMIN_ACTIONS} from '../actions/adminActions';
import { getAllUsers, getApprovedArticles, getNewArticles , getModifiedArticles, deleteUser, deleteBadArticle, rejectedArticle, approvedArticle, setUser, deleteTargetArticle} from '../requests/adminRequest';

//fetch all registered users
function* fetchAllUser(action) {
    try {
        let allUsers = yield getAllUsers();
        yield put({
            type: ADMIN_ACTIONS.SET_ALL_USER,
            payload: allUsers
        });
    } catch (error) {
        console.log('error in admin saga on GET', error);   
    }
}

//fetch all articles approved to be used in the catalogue table
function* fetchArticlesApproved(action) {
    try {
        let approvedArticles = yield getApprovedArticles();
        yield put({
            type: ADMIN_ACTIONS.SET_APPROVED_ARTICLE,
            payload: approvedArticles
        })
    } catch (error) {
        console.log('error in admin saga getting approved articles');
    }
}

//fetch new articles for the new articles table 
function* fetchNewArticles(action){
    try {
        let newArticle = yield getNewArticles();
        yield put ({
            type: ADMIN_ACTIONS.SET_NEW_ARTICLE,
            payload: newArticle
        })
    }catch (error) {
        console.log('error in admin saga getting new Article ', error);
    }
}

//fetches modified articles waiting for admin review
function* fetchModifiedArticles(action){
    try{
        let modifiedArticle = yield getModifiedArticles();
        yield put({
            type: ADMIN_ACTIONS.SET_MODIFIED_ARTICLE,
            payload: modifiedArticle,
        })
    }catch (error) {
        console.log('error in admin saga getting modified Article ',error);
    }
}

//deletes user accounts
function* deleteUserAccount(action){
    try{
        let id = action.payload
        yield deleteUser(id);
        yield fetchAllUser();
    }
    catch (error) {
        console.log('Error deleting user account');
    }
}

//approves newly added articles
function* approveArticle (action){
    try{
        yield approvedArticle(action);
        yield fetchNewArticles();
        yield fetchModifiedArticles();

    }catch(error) {
        console.log('error in admin saga approving article', error)
    }
}

//changes user types
function* userType(action){
    try{
        yield setUser(action);
        yield fetchAllUser();
    } catch(error){
        console.log('Error setting user type in the Admin Saga', error);  
    }
}

//rejects newly added articles
function* rejectArticle (action){
    console.log('action in approvedArticle in adminSaga', action);
    try{
        yield rejectedArticle(action);
        yield  fetchNewArticles();
        yield fetchModifiedArticles();
    }catch(error) {
        console.log('error in admin saga approving article', error)
    }
}

function* deleteArticle (action){

    try{
        yield deleteTargetArticle(action)
        yield fetchArticlesApproved();
    }
    catch (error) {
        console.log('Error deleting target Article', error);
    }
}


function* adminSaga() {
    yield takeLatest(ADMIN_ACTIONS.FETCH_ALL_USER, fetchAllUser);
    yield takeLatest(ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE, fetchArticlesApproved);
    yield takeLatest(ADMIN_ACTIONS.FETCH_NEW_ARTICLE, fetchNewArticles);
    yield takeLatest(ADMIN_ACTIONS.FETCH_MODIFIED_ARTICLE, fetchModifiedArticles);
    yield takeLatest(ADMIN_ACTIONS.DELETE_USER, deleteUserAccount);
    yield takeLatest(ADMIN_ACTIONS.APPROVED_ARTICLE, approveArticle);
    yield takeLatest(ADMIN_ACTIONS.SET_USER_TYPE, userType);
    yield takeLatest(ADMIN_ACTIONS.REJECTED_ARTICLE, rejectArticle);
    yield takeLatest(ADMIN_ACTIONS.DELETE_TARGET_ARTICLE, deleteArticle);
}
  
  export default adminSaga;