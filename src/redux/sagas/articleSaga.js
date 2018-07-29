import {put, takeLatest} from 'redux-saga/effects';
import {ARTICLE_ACTIONS} from '../actions/articleActions';
import {getArticles, postArticle, deleteArticle, putArticle} from '../requests/articleRequests';

function* fetchArticles() {
    try {
        let articles = yield getArticles();
        console.log('in article saga to get articles');
        yield put({
            type: ARTICLE_ACTIONS.SHOW_ARTICLES,
            payload: articles
        });
    } catch (error) {
        console.log('error in article saga on GET', error);   
    }
}

function* addArticle(action) {
    console.log('action.payload:', action.payload);
    try {
        let article = action.payload
        yield postArticle(article);
        console.log('in article saga to add article', action.payload);
        yield put ({
            type: ARTICLE_ACTIONS.FETCH_ARTICLES
        })
    } catch (error) {
        console.log('error in article saga on POST', error); 
    }  
} 

function* removeArticle(action) {
    console.log('action.payload:', action.payload);
    try {
        let id = action.payload
        yield deleteArticle(id);
        console.log('in article saga for delete', action.payload);
        yield put ({
            type: ARTICLE_ACTIONS.FETCH_ARTICLES
        })
    } catch (error) {
        console.log('error in article saga on DELETE', error);    
    }   
}

function* updateArticle(action) {
    console.log('action.payload:', action.payload);
    try {
        let article = action.payload
        let id = action.payload.id
        yield putArticle(article, id);
        console.log('in article saga for update', action.payload);
        yield put ({
            type: ARTICLE_ACTIONS.FETCH_ARTICLES
        })
    } catch (error) {
        console.log('error in article saga on PUT', error);
    } 
}

function* articleSaga() {
    yield takeLatest (ARTICLE_ACTIONS.FETCH_ARTICLES, fetchArticles)
    yield takeLatest (ARTICLE_ACTIONS.POST_ARTICLE, addArticle)
    yield takeLatest (ARTICLE_ACTIONS.DELETE_ARTICLE, deleteArticle)
    yield takeLatest (ARTICLE_ACTIONS.UPDATE_ARTICLE, updateArticle)
  }
  
  export default articleSaga;