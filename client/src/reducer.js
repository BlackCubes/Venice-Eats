import { SET_LOADER } from './actions/ui';
import { API_SUCCESS, API_ERROR } from './actions/api';
import { LOGOUT } from './actions/auth';

export default (
  state = {
    isAuthUser: !!localStorage.getItem('user'),
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || {},
    isLoading: false,
    error: null
  },
  action
) => {
  switch (action.type) {
    case API_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      console.log(action.payload);
      return { ...state, isAuthUser: true, user: action.payload.user };
    case API_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT:
      localStorage.removeItem('user');
      return { ...state, isAuthUser: false, user: {} };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
