import { userConstants } from '../constants';
import { history } from '../helpers';
import { alertActions } from './';  

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

export const fileActions = {
  getAllFiles
};

function getAllFiles() {
  //const payload = new FormData();
  //payload.append('myfile', filedata.fileHandle);
  console.log("in getALlFiles");

  const fileList=  [{'author': 'Sudheer', 'filename': 'honestyPledge'},{'author': 'Sudheer', 'filename': 'Greensheet'}];
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

