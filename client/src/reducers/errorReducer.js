import { API_SUCCESS, API_ERROR } from './../actions/api';

export default (state = { error: null }, action) => {
  switch (action.type) {
    case API_SUCCESS:
      return { ...state, error: null };
    case API_ERROR:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
};
