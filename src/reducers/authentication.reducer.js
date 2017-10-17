  import { userConstants } from '../constants';


const initialState =  {};
console.log("in authentication reducer");
console.log(initialState);


export function authentication(state = initialState, action) {
  console.log(action);
  console.log("in authentication reducer");
  console.log(state);
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}