import axios from 'axios';
import { actionChannel } from 'redux-saga/effects';

export function getAllUsers() {
    return axios.get('/api/admin')
        .then(response => response.data)
        .catch((error => {
            console.log('error getting all users from Request', error);
            throw error.response || error;
        }))
}

export function getApprovedArticles() {
    return axios.get('/api/admin/articles')
        .then(response => response.data)
        .catch((error) => {
            console.log('error getting approved articles', error);
            throw error.response || error;
        })
}   

export function getNewArticles() {
    return axios.get('/api/admin/newArticles')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error in the getNewArticles');
        throw error.response || error;
        })
}

export function getModifiedArticles() {
    return axios.get('/api/admin/reviewArticles')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error in the getModifiedArticles');
        throw error.response || error;
        })
}

export function deleteUser(id) {
    return axios.delete(`/api/admin/deleteUser/${id}`)
    .then(response => response)
    .catch((error) => {
        console.log('Error deleting the user');
        throw error.response || error;
    })
}

export function rejectedArticle(article) {
    console.log('ADMINREQUEST-', article, article.payload);
    return axios.put(`api/admin/articles/${article.payload.id}`, article.payload)
    .then(response => {
        console.log('response from rejectedArticle PUT in request', response)
     }) .catch((error)=> {
        console.log('error in the rejectedArticle adminRequest', error);
        throw error.response || error;
    })
}

export function approvedArticle(article) {
    return axios.put(`api/admin/articles/${article.payload.id}`, article.payload)
    .then((response)=> {
console.log('response from approvedArticle PUT in request', response)
    }).catch((error)=>{
        console.log('error in the approvedArticle adminRequest', error);
        throw error.response || error;
    })
}

export function deleteQuasi(action){
    console.log(action);
    return axios.delete(`api/admin/deleteQuasi/${action}`)
    .then((response)=> {
        console.log('deleted article from the quasi table', response)
            }).catch((error)=>{
                console.log('error deleting article from quasi article', error);
                throw error.response || error;
            })
}

export function setUser(type) {
    let id = type.userId;
    let userType = type.payload;
    return axios.put(`api/admin/usertype/${id}`, type)
        .then((response) =>{
            console.log('Successful user type change', response);  
        })
        .catch((error) => {
            console.log('Error changing user type', error);
            throw error.response || error;
        })
}

export function updateArticle(article) {
    let id = article.payload.article_id;
    console.log('article:', article, id);
    return axios.put(`api/admin/editArticle/${id}`, article.payload)
        .then((response) =>{
            console.log('Successful user type change', response);
        })
        .catch((error) => {
            console.log('Error updating article', error);
            throw error.response || error;
        })
}

export function deleteTargetArticle(action) {
    let id = action.payload;
    console.log('target article to delete', id);
    return axios.delete(`api/admin/deleteArticle/${id}`)
        .then((response) => {
            console.log('Sucessful deletion of article');
        })
        .catch((error)=> {
            console.log('Error deleting article', error);
            throw error.response || error;
        })
}

export function getArticlesByLocation(action){
    console.log('action is:', action);
    return axios.get(`api/admin/filterByLocation?lat=${action.lat}&lng=${action.lng}`)
    .then((response)=>{
        console.log('here is response.data:', response.data);
        
        return response.data})
    .catch((error)=>{
        console.log('error retrieving filtered article list in adminRequest:', error);
    })
}