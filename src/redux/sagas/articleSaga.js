import {put, takeLatest} from 'redux-saga/effects';
import {ARTICLE_ACTIONS} from '../actions/articleActions';
import {getArticles, postArticle, deleteArticle, putArticle} from '../requests/articleRequests';
import {getResearchPhase, getResearchType} from '../requests/articleRequests';

function* fetchArticles(action) {
    try {
        let articles = yield getArticles(action.payload);
        console.log('in article saga to get articles', articles);
        yield put({
            type: ARTICLE_ACTIONS.SHOW_ARTICLES,
            payload: articles
        });
    } catch (error) {
        console.log('error in article saga on GET', error);   
    }
}

function* fetchResearchType(action) {
    try {
        let research_type = yield getResearchType(action.payload);
        console.log('in article saga to get research type', research_type);
        yield put({
            type: ARTICLE_ACTIONS.SHOW_RESEARCH_TYPE,
            payload: research_type
        });
    } catch (error) {
        console.log('error in article saga on GET for research_type', error);   
    }
}

function* fetchResearchPhase(action) {
    try {
        let research_phase = yield getResearchPhase(action.payload);
        console.log('in article saga to get research phase', research_phase);
        yield put({
            type: ARTICLE_ACTIONS.SHOW_RESEARCH_PHASE,
            payload: research_phase
        });
    } catch (error) {
        console.log('error in article saga on GET for research_phase', error);   
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
    yield takeLatest (ARTICLE_ACTIONS.FETCH_RESEARCH_TYPE, fetchResearchType)
    yield takeLatest (ARTICLE_ACTIONS.FETCH_RESEARCH_PHASE, fetchResearchPhase)
    yield takeLatest (ARTICLE_ACTIONS.POST_ARTICLE, addArticle)
    yield takeLatest (ARTICLE_ACTIONS.DELETE_ARTICLE, deleteArticle)
    yield takeLatest (ARTICLE_ACTIONS.UPDATE_ARTICLE, updateArticle)
  }
  
  export default articleSaga;