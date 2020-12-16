import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import foodtruckReducer from './foodtruckReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  apiError: errorReducer,
  apiFoodtruck: foodtruckReducer,
  apiUser: userReducer
});
