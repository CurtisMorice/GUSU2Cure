import axios from 'axios';

export function getLocations() {
    return axios.get('/api/articles')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting resources', error);
        throw error.response || error;      
    })
}