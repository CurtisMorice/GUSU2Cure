import {combineReducers} from 'redux';
import {ARTICLE_ACTIONS} from '../actions/articleActions';

const article = (state=[], action) => {
    console.log('in the article reducer');
    
    switch(action.type) {
        case ARTICLE_ACTIONS.SHOW_ARTICLES:
            console.log('in article reducer for GET', action.payload);
            return action.payload;
        case ARTICLE_ACTIONS.POST_ARTICLE:
            console.log('in article reducer for POST', action.payload);
            return [action.payload]
        case ARTICLE_ACTIONS.DELETE_ARTICLE:
            console.log('in article reducer for DELETE', action.payload);
            return [action.payload]
        case ARTICLE_ACTIONS.UPDATE_ARTICLE:
            console.log('in article reducer for PUT', action.payload);
            return [action.payload]
        default:
            return state; 
    }
}

export default combineReducers({
    article
})