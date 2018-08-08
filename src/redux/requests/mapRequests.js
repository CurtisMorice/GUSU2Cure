import axios from 'axios';

export function getLocations(action) {
   if (!action.payload){
    
    return axios.get('/api/articles')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting resources', error);
        throw error.response || error;      
    })
    }
    
    else if (action.payload.param === 'type'){

        return axios.get(`/api/articles/?param=${action.payload.param}&value=${action.payload.value}`)
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting resources', error);
        throw error.response || error;      
    })
    }
    
    else if (action.payload.param === 'phase'){
        return axios.get(`/api/articles/?param=${action.payload.param}&value=${action.payload.value}`)
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting resources', error);
        throw error.response || error;      
    })
    }
}