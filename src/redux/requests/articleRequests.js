import axios from 'axios';

export function getArticles() {
    return axios.get('/api/article')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting articles', error);
        throw error.response || error;      
    })
}

export function postArticle(article){
    return axios.post('/api/article', article)
    .then((response) => {
        console.log('successfully posted article');
    })
    .catch((error) => {
        console.log('error posting article', error);
        throw error.response || error;
    })
}

export function deleteArticle(id){
    return axios.delete(`/api/article/${id}`)
    .then((response) => {
        console.log('successfully deleted article');
    })
    .catch((error) => {
        console.log('error deleting article', error);
        throw error.response || error;
    })
}

export function putArticle(article, id){
    return axios.put(`/api/article/${id}`, article)
    .then((response) => {
        console.log('successfully updated article', response);
    })
    .catch((error) => {
        console.log('error updating article', error);
        throw error.response || error; 
    })
}