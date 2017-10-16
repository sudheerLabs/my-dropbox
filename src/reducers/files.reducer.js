import { userConstants } from '../constants';

//let user = JSON.parse(localStorage.getItem('user'));
//const initialState = user ? { loggedIn: true, user } : {};
const initialState = {};

export function files(state = initialState, action) {
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
        fileList: action.fileList
      };
    case userConstants.GETALLFILES_FAILURE:
      return { 
        error: action.error
      };    
    default:
      return state;

  }
}