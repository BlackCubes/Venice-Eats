import { SET_LOADER } from './../actions/ui';
import { API_SUCCESS, API_ERROR } from './../actions/api';
import { LOGOUT } from './../actions/auth';

export default (
  state = {
    isAuthUser: !!localStorage.getItem('jwt'),
    token: localStorage.getItem('jwt') || null,
    user: null,
    isLoading: false,
    error: null
  },
  action
) => {
  switch (action.type) {
    case API_SUCCESS:
      localStorage.setItem('jwt', action.payload.token);
      return {
        ...state,
        isAuthUser: true,
        token: action.payload.token,
        user: action.payload.data.user
      };
    case API_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT:
      localStorage.removeItem('jwt');
      return { ...state, isAuthUser: false, token: null, user: null };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
