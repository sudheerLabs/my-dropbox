import { userConstants } from '../constants';
import { history } from '../helpers';
import { alertActions } from './';  

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

export const fileActions = {
  getAllFiles,
  toggleStar,
  deleteFile
};




function getAllFiles() {
  console.log("in getALlFiles");

  //const fileList=  [{'author': 'Sudheer', 'filename': 'honestyPledge'},{'author': 'Sudheer', 'filename': 'Greensheet'}];
  //const fileListJSON = JSON.parse(fileList);
  //return dispatch => dispatch(success(fileList));
   
  return dispatch => {    
    return fetch(`${api}/users/getFiles`, { 
        method: 'GET',
        credentials : 'include' 
    })
      .then(response => 
       {    
          console.log(JSON.stringify(response));
          if (response.status === 201) { 

            return response.json();               
          }
       })
      .then(fileList =>
      {    
        console.log("this is not strigified" + fileList);
        console.log("this is stringified " + JSON.stringify(fileList));
        dispatch(success(fileList));
        history.push('/dashboard');
      })
  }

  function success(fileList) { return { type: userConstants.GETALLFILES_SUCCESS, fileList } }
}

function toggleStar(fileId) {
  console.log(fileId);
  //return dispatch => dispatch(success(fileId));

   return dispatch => {    
    return fetch(`${api}/users/toggleStar`, { 
        method: 'POST',
        headers:{
         'Content-Type': 'application/json'
        },
        body : JSON.stringify({fileId}),
        credentials : 'include' 
    })
      .then(
        response => {    
          console.log(JSON.stringify(response));
          if (response.status === 201) { 
            return response.json();
          }
          else{
            return Promise.reject("Operation failed");
          }
        },
        error => { return Promise.reject("No Response from Server"); }
       )
      .then(message => {
        dispatch(success(fileId));
      },
      error => {
        console.log("Error occurred");
      })
  }
  
  function success(fileId){ return {type: userConstants.TOGGLE_STAR, fileId}}
}

function deleteFile(fileId) {
  console.log(fileId);
  //return dispatch => dispatch(success(fileId));

   return dispatch => {    
    return fetch(`${api}/users/deleteFile`, { 
        method: 'POST',
        headers:{
         'Content-Type': 'application/json'
        },
        body : JSON.stringify({fileId}),
        credentials : 'include' 
    })
      .then(
        response => {    
          console.log(JSON.stringify(response));
          if (response.status === 201) { 
            return response.json();
          }
          else{
            return Promise.reject("Operation failed");
          }
        },
        error => { return Promise.reject("No Response from Server"); }
       )
      .then(message => {
        dispatch(success(fileId));
      },
      error => {
        console.log("Error occurred");
      })
  }
  
  function success(fileId){ return {type: userConstants.DELETE_FILE, fileId}}
}