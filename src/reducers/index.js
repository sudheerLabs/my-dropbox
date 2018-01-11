import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { signup } from './signup.reducer';
import { files } from './files.reducer';
import { alert } from './alert.reducer';

const appReducer = combineReducers({
  authentication,
  signup,
  alert,
  files
});

const rootReducer = (state, action) => {
  if (action.type === 'USERS_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;