import { userConstants } from '../constants';
import { history } from '../helpers';
import { alertActions } from './';  

//const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';

export const fileActions = {
  getAllFiles,
  getAllFilesHome,
  toggleStar,
  deleteFile,
  addFolder,
  shareFile,
  downloadFile
};



/*
function getAllFiles(dir) {
  console.log("in getALlFiles");

  //const fileList=  [{'author': 'Sudheer', 'filename': 'honestyPledge'},{'author': 'Sudheer', 'filename': 'Greensheet'}];
  //const fileListJSON = JSON.parse(fileList);
  //return dispatch => dispatch(success(fileList));
   
  return dispatch => {    
    return fetch(`${api}/users/getFiles`, {
    return fetch('http://localhost:3001/user/getAllFiles', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({dir}),
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
        dispatch(success({fileList, dir}));
        history.push('/dashboard');
      })
  }

  function success(payload) { return { type: userConstants.GETALLFILES_SUCCESS, payload } }
}
*/

function getAllFiles(dir) {
  console.log("in getALlFiles");

  //const fileList=  [{'author': 'Sudheer', 'filename': 'honestyPledge'},{'author': 'Sudheer', 'filename': 'Greensheet'}];
  //const fileListJSON = JSON.parse(fileList);
  //return dispatch => dispatch(success(fileList));
   
  return dispatch => {    
    return fetch('http://localhost:8080/user/getFiles', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({dir}),
        credentials : 'include' 
    })
      .then(response => {
          if(response.status !== 200){
            return Promise.reject("Files fetch failed");
          }
          return response.json();
        },
        error => {
          return Promise.reject("No Response from Server");
        })
      .then(fileList =>
      {    
        console.log("this is not strigified" + fileList);
        console.log("this is stringified " + JSON.stringify(fileList));
        dispatch(success({fileList, dir}));
        history.push('/dashboard');
      })
  }

  function success(payload) { return { type: userConstants.GETALLFILES_SUCCESS, payload } }
}


function getAllFilesHome(dir) {
  console.log("in getALlFiles");

  //const fileList=  [{'author': 'Sudheer', 'filename': 'honestyPledge'},{'author': 'Sudheer', 'filename': 'Greensheet'}];
  //const fileListJSON = JSON.parse(fileList);
  //return dispatch => dispatch(success(fileList));
   
  return dispatch => {    
    return fetch('http://localhost:8080/user/getFiles', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({dir}),
        credentials : 'include' 
    })
      .then(response => {
          if(response.status !== 200){
            return Promise.reject("Files fetch failed");
          }
          return response.json();
        },
        error => {
          return Promise.reject("No Response from Server");
        })
      .then(fileList =>
      {    
        console.log("this is not strigified" + fileList);
        console.log("this is stringified " + JSON.stringify(fileList));
        dispatch(success({fileList, dir}));
        history.push('/home');
      })
  }

  function success(payload) { return { type: userConstants.GETALLFILES_SUCCESS, payload } }
}

/*
function getAllFilesHome(dir) {
  console.log("in getALlFileshome");

  //const fileList=  [{'author': 'Sudheer', 'filename': 'honestyPledge'},{'author': 'Sudheer', 'filename': 'Greensheet'}];
  //const fileListJSON = JSON.parse(fileList);
  //return dispatch => dispatch(success(fileList));
   
  return dispatch => {    
    return fetch(`${api}/users/getFiles`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({dir}),
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
        dispatch(success({fileList, dir}));
        history.push('/home');
      })
  }

  function success(payload) { return { type: userConstants.GETALLFILES_SUCCESS, payload } }
}
*/

function toggleStar(fileId) {
  console.log(fileId);
  //return dispatch => dispatch(success(fileId));

   return dispatch => {    
    return fetch(`${api}/user/toggleStar`, { 
        method: 'POST',
        headers:{
         'Content-Type': 'application/json'
        },
        body : JSON.stringify({fileId}),
        credentials : 'include' 
    })
    .then(response => {
          if(response.status !== 200){
            console.log("hi there");
            return Promise.reject("Files starring failed");
          }
          return response.json();
        },
        error => {
          return Promise.reject("No Response from Server");
        })
      .then(message => {
        console.log(message);
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
    return fetch(`${api}/user/deleteFile`, { 
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
          if (response.status === 200) { 
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

function addFolder(folderName, path) {
  console.log(folderName);
  //return dispatch => dispatch(success(fileId));

   return dispatch => {    
    return fetch(`${api}/user/addFolder`, { 
        method: 'POST',
        headers:{
         'Content-Type': 'application/json'
        },
        body : JSON.stringify({folderName, path, }),
        credentials : 'include' 
    })
      .then(
        response => {    
          console.log(JSON.stringify(response));
          console.log(response.status);
          if (response.status === 200) { 
            return response.json();
          }
          else{
            return Promise.reject("Operation failed");
          }
        },
        error => { return Promise.reject("No Response from Server"); }
       )
      .then(folder => {
        console.log(folder);
        dispatch(success(folder));
      },
      error => {
        console.log("Error occurred");
      })
  }
  
  function success(folder){ return {type: userConstants.CREATE_FOLDER, folder}}
}



function shareFile(filename, userlist, path) {
  console.log(filename);
  console.log(userlist);
  console.log(path);
  //return dispatch => dispatch(success(fileId));

   return dispatch => {    
    return fetch(`${api}/user/shareFile`, { 
        method: 'POST',
        headers:{
         'Content-Type': 'application/json'
        },
        body : JSON.stringify({filename, userlist, path}),
        credentials : 'include' 
    })
      .then(
        response => {    
          console.log(JSON.stringify(response));
          if (response.status === 200) { 
            return {"message": "shared successfully"};
          }
          else{
            return Promise.reject("Operation failed");
          }
        },
        error => { return Promise.reject("No Response from Server"); }
       )
      .then(message => {
        console.log(message);
        //dispatch(success(message));
      },
      error => {
        console.log("Error occurred");
      })
  }
  
  //function success(folder){ return {type: userConstants.CREATE_FOLDER, folder}}
}



function downloadFile(path, filename) {
  console.log(path);
  //return dispatch => dispatch(success(fileId));
  path = path + filename + ",";

   return dispatch => {    
    return fetch(`${api}/user/downloadFile`, { 
        method: 'POST',
        headers:{
         'Content-Type': 'application/json'
        },
        body : JSON.stringify({path}),
        credentials : 'include' 
    })
      .then(
        response => {    
          console.log(response);
          if (response.status === 200) { 
            return response.text();
          }
          else{
            return Promise.reject("Operation failed");
          }
        },
        error => { return Promise.reject("No Response from Server"); }
       )
      .then(message => {
        console.log(message);
        saveTextAsFile(message, filename);
        //dispatch(success(message));
      },
      error => {
        console.log("Error occurred");
      })
  }
  
  //function success(folder){ return {type: userConstants.CREATE_FOLDER, folder}}
}


function saveTextAsFile(text, filename)
{
    var textToWrite = text;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = filename;
      var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement();
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}