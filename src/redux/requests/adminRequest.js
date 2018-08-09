import axios from 'axios';
import { actionChannel } from 'redux-saga/effects';

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
    return axios.get('/api/admin/newArticles')
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

export function deleteUser(id) {
    console.log('In the delete user account request');
    return axios.delete(`/api/admin/deleteUser/${id}`)
    .then(response => response)
    .catch((error) => {
        console.log('Error deleting the user');
        throw error.response || error;
    })
}

export function rejectedArticle(article) {
    console.log('in rejectedArticleRequest', article);
    return axios.put(`api/admin/rejectedArticle`, article)
    .then(response => response.data).catch((error)=>{
        console.log('error in the rejectedArticle adminRequest', error);
        throw error.response || error;
    })
}

export function approvedArticle(article) {
    // console.log('IN APPROVED Request', article.payload.id);
    return axios.put(`api/admin/articles/${article.payload.id}`, article.payload)
    .then((response)=> {
console.log('response from approvedArticle PUT', response)
    }).catch((error)=>{
        console.log('error in the approved adminRequest', error);
        throw error.response || error;
    })
}

export function setUser(type) {
    console.log('user type request',type);
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
