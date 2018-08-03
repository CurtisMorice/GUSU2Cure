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