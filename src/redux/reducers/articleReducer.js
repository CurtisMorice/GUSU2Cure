import {combineReducers} from 'redux';
import {ARTICLE_ACTIONS} from '../actions/articleActions';

const article = (state=[], action) => {
    switch(action.type) {
        case ARTICLE_ACTIONS.SHOW_ARTICLES:
            return action.payload
        case ARTICLE_ACTIONS.POST_ARTICLE:
            return [action.payload]
        case ARTICLE_ACTIONS.DELETE_ARTICLE:
            return [action.payload]
        case ARTICLE_ACTIONS.UPDATE_ARTICLE:
            return [action.payload]
        case ARTICLE_ACTIONS.UPDATE_ARTICLE_STATUS:
            return [action.payload]
        case ARTICLE_ACTIONS.POST_QUASI_ARTICLE:
            return [action.payload]
        case ARTICLE_ACTIONS.POST_QUASI_DELETE:
            return [action.payload]
        default:
            return state; 
    }
}

const research_type = (state=[], action) => {
    switch(action.type) {
        case ARTICLE_ACTIONS.SHOW_RESEARCH_TYPE:
            // console.log('in article reducer for GET research type', action.payload);
            return action.payload
        default:
            return state; 
    }
}

const research_phase = (state=[], action) => {
    switch(action.type) {
        case ARTICLE_ACTIONS.SHOW_RESEARCH_PHASE:
            // console.log('in article reducer for GET research phase', action.payload);
            return action.payload
        default:
            return state; 
    }
}

export default combineReducers({
    article,
    research_type,
    research_phase
})