import { userConstants } from '../constants';

export function signup(state = {}, action) {
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      return { signingup: true };
    case userConstants.SIGNUP_SUCCESS:
      return {...state, user:action.userdata, loggedIn: true,};
    case userConstants.SIGNUP_FAILURE:
      return {};
    default:
      return state
  }
}