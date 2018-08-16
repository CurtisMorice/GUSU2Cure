import axios from 'axios';
import { actionChannel } from 'redux-saga/effects';

export function callUser() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
  return axios.get('api/users', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function userProfileUpdate(profile) {  
  let profileUpdate = profile.payload;
  let id = profile.payload.id;
  return axios.put(`api/profiles/update/${id}`, profileUpdate)
    .then((response) => {
        console.log('succesful profile update');
    })
    .catch((error) => {
      console.log('Error updating profile', error);
    })
}
