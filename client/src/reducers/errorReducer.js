import { API_ERROR } from './../actions/api';

export default (state = { error: null }, action) => {
  switch (action.type) {
    case API_ERROR:
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
};
