import {put, takeLatest} from 'redux-saga/effects';
import {ADMIN_ACTIONS} from '../actions/adminActions';
import { getAllUsers, getApprovedArticles, getNewArticles , getModifiedArticles, deleteUser, deleteTargetArticle, rejectedArticle, approvedArticle, setUser} from '../requests/adminRequest';


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


function* approveArticle (action){
    try{
        yield approvedArticle(action);
        yield fetchNewArticles();
        yield fetchModifiedArticles();

    }catch(error) {
        console.log('error in admin saga approving article', error)
    }
}

function* userType(action){
    try{
        yield setUser(action);
        yield fetchAllUser();
    } catch(error){
        console.log('Error setting user type in the Admin Saga', error);  
    }
}
function* rejectArticle (action){
    console.log('action in approvedArticle in adminSaga', action);
    try{
        yield rejectedArticle(action);
        yield  fetchNewArticles();
        yield fetchModifiedArticles();

    }catch(error) {
        console.log('error in admin saga rejecting  article', error)
    }
}

function* deleteBadArticle (action){
    try{
        yield deleteTargetArticle(action);
        yield fetchNewArticles();
    }catch(error) {
        console.log('error in the deletBadArticle in adminSage', error);

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
    yield takeLatest(ADMIN_ACTIONS.DELETE_TARGET_ARTICLE, deleteBadArticle)

}
  
  export default adminSaga;