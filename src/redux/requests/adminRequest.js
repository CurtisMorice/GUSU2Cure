import axios from 'axios';

export function getAllUsers() {
    console.log('in get all users request')
    return axios.get('/api/admin')
        .then(response => response.data)
        .catch((error => {
            console.log('error getting all users from Request', error);
            throw error.response || error;
        }))
}

export function getApprovedArticles() {
    console.log('in get approved articles request in the admin');
    return axios.get('/api/admin/articles')
        .then(response => response.data)
        .catch((error) => {
            console.log('error getting approved articles', error);
            throw error.response || error;
        })
}   

export function getNewArticles() {
    console.log('in get new articles request in the admin');
    return axios.get('/api/admin/articles')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error in the getNewArticles');
        throw error.response || error;
        })
}

export function getModifiedArticles() {
    console.log('in get modified articles request in the admin');
    return axios.get('/api/admin/articles')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error in the getModifiedArticles');
        throw error.response || error;
        })
}