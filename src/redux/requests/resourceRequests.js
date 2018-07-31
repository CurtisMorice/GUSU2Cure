import axios from 'axios';

export function getResources() {
    return axios.get('/api/resources')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting resources', error);
        throw error.response || error;      
    })
}

export function postResource(resource){
    return axios.post('/api/resources', resource)
    .then((response) => {
        console.log('successfully posted resource');
    })
    .catch((error) => {
        console.log('error posting resource', error);
        throw error.response || error;
    })
}

export function deleteResource(id){
    return axios.delete(`/api/resources/${id}`)
    .then((response) => {
        console.log('successfully deleted resource');
    })
    .catch((error) => {
        console.log('error deleting resource', error);
        throw error.response || error;
    })
}

export function putResource(resource, id){
    return axios.put(`/api/resources/${id}`, resource)
    .then((response) => {
        console.log('successfully updated resource', response);
    })
    .catch((error) => {
        console.log('error updating resource', error);
        throw error.response || error; 
    })
}