import { userConstants } from '../constants';
import { history } from '../helpers';
import { alertActions } from './';  
import { fileActions } from './'; 

//const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';

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
   //type : userConstants.SIGNUP_SUCCESS,
   type : userConstants.LOGIN_SUCCESS,
   user : payload
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
    return fetch(`http://localhost:8080/user/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password}),
      credentials : 'include' 
    })
    .then(response => {
      if(response.status !== 200){
        return Promise.reject("Invalid username or password");
      }
      return "success";
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

function signup(userDetails){
  return dispatch =>{
    return fetch(`${api}/user/signup`, {
      method: 'POST',
      headers:{
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails),
      credentials:'include' 
    })
    .then(response => {
      console.log(response.status);
      if(response.status === 201){
        dispatch(signupSuccess(userDetails));
        dispatch(alertActions.success("Sign up successful. You can login now."));
        history.push('/dashboard');
        //return response.json();
      }
      //return Promise.reject("Signup failed");
      dispatch(signupFailure("error"));
      dispatch(alertActions.error("Sign up failed"));
    },
    error => {
      //return Promise.reject("No Response from Server");
      dispatch(signupFailure(error));
      dispatch(alertActions.error("Sign up failed"));
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
    return fetch(`${api}/user/logout`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({username}),
      credentials:'include' 
    })
    .then(response => {
      if(response.status !== 200){
        //return Promise.reject("Signout failed");
        dispatch(failure("Error occurred"));
        dispatch(alertActions.error("Error occurred"));
      }
      console.log("logging out - move to home");
      dispatch(success("Logged Out Successfully"));
      history.push('/login'); 
    },
    error => {
      //return Promise.reject("No Response from Server");
      dispatch(failure("No Response from server"));
      dispatch(alertActions.error("No Response from server"));
    })
  };

  function success(user) { return { type: userConstants.LOGOUT, user } }
  function failure(error) { return { type: userConstants.LOGOUT, error } }
}


export function uploadSingleFile(data, path) {
  console.log("uploading....");
  console.log(data);
  console.log(path);
  const payload = new FormData();
  payload.append('files', data.fHandle);
  payload.append('path', path);
  return dispatch => {
    return fetch(`${api}/user/uploadFile`, {
        method: 'POST',
        body: payload,
        credentials:'include'  
    })
    .then(response =>  {
        console.log(response.status);
        if (response.status === 201) {
          dispatch(fileActions.getAllFiles(path));
          history.push('/Dashboard');
        }
    })
    }
}