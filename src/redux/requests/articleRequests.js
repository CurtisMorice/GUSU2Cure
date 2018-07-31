import axios from 'axios';

export function getArticles(id) {
    console.log('id', id);
    return axios.get(`/api/articles/${id}`)
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting articles', error);
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

export function putArticle(article, id){
    return axios.put(`/api/articles/${id}`, article)
    .then((response) => {
        console.log('successfully updated article', response);
    })
    .catch((error) => {
        console.log('error updating article', error);
        throw error.response || error; 
    })
}