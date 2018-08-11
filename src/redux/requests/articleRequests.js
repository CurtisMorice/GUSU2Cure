import axios from 'axios';

export function getArticles() {
    return axios.get('/api/articles')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting articles', error);
        throw error.response || error;      
    })
}

export function getUserArticles(id) {
    console.log('this is id', id);
    return axios.get(`/api/articles/userArticle/${id}`)
    .then(response => response.data)
    .catch((error) => {
        console.log('error getting users articles', error);
        throw error.response || error;      
    })
}

export function getResearchType() {
    return axios.get('/api/articles/type')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting research type', error);
        throw error.response || error;      
    })
}

export function getResearchPhase() {
    return axios.get('/api/articles/phase')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting research phase', error);
        throw error.response || error;      
    })
}

export function postArticle(article){
    return axios.post('/api/articles', article)
    .then((response) => {
        console.log('successfully posted article');
    })
    .catch((error) => {
        console.log('error posting article', error);
        throw error.response || error;
    })
}

export function deleteArticle(id){
    return axios.delete(`/api/articles/${id}`)
    .then((response) => {
        console.log('successfully deleted article');
    })
    .catch((error) => {
        console.log('error deleting article', error);
        throw error.response || error;
    })
}

export function putArticle(id, article){
    console.log('articleRequest', id, article);
    return axios.put(`/api/articles/${id}, article`)
    .then((response) => {
        console.log('successfully updated article', response);
    })
    .catch((error) => {
        console.log('error updating article', error);
        throw error.response || error; 
    })
}

export function requestDeleteArticle(id){
    return axios.put(`/api/articles/delete/${id}`)
    .then((response) => {
        console.log('successfully requested delete', response);
    })
    .catch((error) => {
        console.log('error requesting delete', error);
        throw error.response || error;  
    })   
}