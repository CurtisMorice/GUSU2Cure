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

export function placeholder() {
  console.log('hi');
}

export function userProfileUpdate(profile) {  
  let profileUpdate = profile.payload;
  let id = profile.payload.id;
  console.log('in the user request', profileUpdate)
  return axios.put(`api/profiles/update/${id}`, profileUpdate)
    .then((response) => {
        console.log('succesful profile update');
    })
    .catch((error) => {
      console.log('Error updating profile', error);
    })
}
