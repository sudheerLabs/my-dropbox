import { userConstants } from '../constants';
import { history } from '../helpers';
import { alertActions } from './';  

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

export const userActions = {
  login,
  signup,
  signout
};


function loginSuccess(user){
 return {
   type : userConstants.LOGIN_SUCCESS,
   user
 }
}

function loginFailure(payload){
  console.log(payload + "sudheer");
  console.log(typeof payload)
  console.log(typeof JSON.stringify(payload));
  
 return {
   type : userConstants.LOGIN_FAILURE,
   userdata : payload
 }
}

function signupSuccess(payload){
 return {
   type : userConstants.SIGNUP_SUCCESS,
   userdata : payload
 }
}

function signupFailure(payload){
 return {
   type : userConstants.SIGNUP_FAILURE,
   userdata : payload
 }
}


function fileUploadSuccess(payload){
 return {
   type : userConstants.FILEUPLOAD_SUCCESS,
   userdata : payload
 }
}


function login(username, password) {
  console.log("login" + username + " " + password + JSON.stringify({username, password}));
  return dispatch => {
    return fetch(`${api}/users/doLogin`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(response => {
      if(response.status !== 201){
        return Promise.reject("Invalid username or password");
      }
      return response.json();
    },
    error => {
      return Promise.reject("No Response from Server");
    })
    .then(
      message => {
        dispatch(loginSuccess({username}));
        history.push('/dashboard');       
      },
      error =>{
        dispatch(loginFailure(error));
        dispatch(alertActions.error(error));
      })
  }
}

/*

function login(username, password) {
  console.log("login" + username + " " + password + JSON.stringify({username, password}));
  return dispatch => {
    return fetch(`${api}/users/doLogin`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(response => {
      if(response.status === 201){
        console.log(response.data + "response" + typeof response);
        dispatch(loginSuccess(response.json()));
        history.push('/dashboard');
      }
      else{
        dispatch(loginFailure(response.json()));
        dispatch(alertActions.error("Incorrect Username or password")); 
      }
    })
  }
}
*/

function signup(userDetails){
  return dispatch =>{
    return fetch(`${api}/users/doSignup`, {
      method: 'POST',
      headers:{
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
    .then(response => {
      if(response.status !== 201){
        return Promise.reject("Signup failed");
      }
      return response.json();
    },
    error => {
      return Promise.reject("No Response from Server");
    })
    .then(
      user =>{
        dispatch(signupSuccess(userDetails));
        dispatch(alertActions.success("Sign up successful. You can login now."));
        history.push('/dashboard');
      },
      error =>{
        dispatch(signupFailure(error));
        dispatch(alertActions.error("Sign up failed"));
      });
    
  }
}

/*
function signup(userDetails){
  return dispatch =>{
    return fetch(`${api}/user/doSignup`, {
      method: 'POST',
      headers:{
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
    .then(response => response.status)
    .then(status => {
      if (status === 201) { 
        dispatch(signupSuccess(userDetails));
        history.push('/dashboard');       
      }
    })
  }
}

*/


function signout(username) {
  return dispatch => {
    return fetch(`${api}/users/doLogout`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username})
    })
    .then(response => {
      if(response.status !== 201){
        return Promise.reject("Signout failed");
      }
      return response.json();
    },
    error => {
      return Promise.reject("No Response from Server");
    })
    .then(
      message => {
        dispatch(success(message));
        history.push('/login');       
      },
      error =>{
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      })
  };

  function success(user) { return { type: userConstants.LOGOUT, user } }
  function failure(error) { return { type: userConstants.LOGOUT, error } }
}


export function uploadSingleFile(data) {
  console.log("uploading....");
  console.log(data);
  const payload = new FormData();
  payload.append('files', data.fHandle);
  return dispatch => {
    return fetch(`${api}/users/doFileUpload`, {
        method: 'POST',
        body: payload 
    })
    .then(response =>  {
        if (response.status === 201) { 
                dispatch(fileUploadSuccess(data));
                history.push('/Dashboard');
        }
    })
    }
}