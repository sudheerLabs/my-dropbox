 import { userConstants } from '../constants';

//let user = JSON.parse(localStorage.getItem('user'));

//const initialState = user ? { loggedIn: true, user } : {};
//const initialState = {folderList : ["asdf"]};
const initialState = {pwd : ",root,"};

export function files(state = initialState, action) {

  console.log(action);
  console.log("in file reducer");
  console.log(state);
  switch (action.type) {
    case userConstants.FILEUPLOAD_SUCCESS:
      return state;
      /*return {
        
      };*/

    case userConstants.GETALLFILES_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALLFILES_SUCCESS:
      return {
        ...state,
        fileList: action.payload.fileList,
        pwd: action.payload.dir
      };
    case userConstants.GETALLFILES_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.TOGGLE_STAR:
      return {
        ...state,
        fileList: state.fileList.map(file =>
          file.fileId == action.fileId
            ? {...file, "starred": file.starred=="Y" ? "N" : "Y"}
            : file
        )
      }; 
    case userConstants.DELETE_FILE:
      return {
        ...state, 
        fileList: state.fileList.map(file =>
          file.fileId == action.fileId
            ? {...file, "deleted": "Y"}
            : file
        )
      };
    case userConstants.CREATE_FOLDER:
      return {
        ...state,
        fileList : [...state.fileList, action.folder]
      };

    default:
      return state;

  }
}