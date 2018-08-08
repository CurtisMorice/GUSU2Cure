import {put, takeLatest} from 'redux-saga/effects';
import {ADMIN_ACTIONS} from '../actions/adminActions';
import { getAllUsers, getApprovedArticles, getNewArticles , getModifiedArticles, deleteUser, deleteBadArticle, rejectedArticle, approvedArticle} from '../requests/adminRequest';


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
        console.log('error in admin saga getting new Article ', error);
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
        console.log('error in admin saga getting modified Article ',error);
    }
}

function* deleteUserAccount(action){
    try{
        console.log('id to delete', action.payload);
        let id = action.payload
        yield deleteUser(id);
    }
    catch (error) {
        console.log('Error deleting user account');
        
    }
}

// function* deleteArticle (action){
//     try{
//         let articleX = yield deleteBadArticle();
//         console.log('in admin saga deleteArticle', articleX);
//         yield put({
//         type: ADMIN_ACTIONS.DELETE_ARTICLE,
//         payload: articleX,
//         })
//     }catch(error) {
//         console.log('error in admin saga deleting article', error)
//     }
// }

// function* rejectArticle (action){
//     try{
//         console.log('action', action);
        
//         let rejected = yield rejectedArticle(action);
//         console.log('in admin saga rejectedArticle', rejected);
//         yield put({
//         type: ADMIN_ACTIONS.REJECTED_ARTICLE,
//         payload: rejected,
//         })
//     }catch(error) {
//         console.log('error in admin saga deleting article', error)
//     }
// }

function* approveArticle (action){
    console.log('action in approvedArticle in adminSaga', action);
    try{
        let approved = yield approvedArticle(action);
        console.log('in admin saga approvedArticle', approved);
        yield put({
        type: ADMIN_ACTIONS.APPROVED_ARTICLE,
        payload: approved
        })
    }catch(error) {
        console.log('error in admin saga approving article', error)
    }
}


function* adminSaga() {
    yield takeLatest(ADMIN_ACTIONS.FETCH_ALL_USER, fetchAllUser);
    yield takeLatest(ADMIN_ACTIONS.FETCH_APPROVED_ARTICLE, fetchArticlesApproved);
    yield takeLatest(ADMIN_ACTIONS.FETCH_NEW_ARTICLE, fetchNewArticles);
    yield takeLatest(ADMIN_ACTIONS.FETCH_MODIFIED_ARTICLE, fetchModifiedArticles);
    yield takeLatest(ADMIN_ACTIONS.DELETE_USER, deleteUserAccount);
    // yield takeLatest(ADMIN_ACTIONS.DELETE_ARTICLE, deleteArticle);
    // yield takeLatest(ADMIN_ACTIONS.REJECTED_ARTICLE, rejectArticle);
    yield takeLatest(ADMIN_ACTIONS.APPROVED_ARTICLE, approveArticle);
}
  
  export default adminSaga;