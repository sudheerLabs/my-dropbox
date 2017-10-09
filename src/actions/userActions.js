import { userConstants } from '../constants';
import { history } from '../helpers';

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

export const userActions = {
  login,
  signup
};


function loginSuccess(payload){
  console.log(payload + "sudheer");
  console.log(typeof payload)
  console.log(typeof JSON.stringify(payload));
  
 return {
   type : userConstants.LOGIN_SUCCESS,
   userdata : payload
 }
}

function signupSuccess(payload){
 return {
   type : userConstants.SIGNUP_SUCCESS,
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
        console.log(response.data + "response" + typeof response);

      }
      return response.json();
    })
    .then(user => {
      //if (status === 201) {
        dispatch(loginSuccess(user));
        history.push('/dashboard');       
      }
    )
  }
}

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

