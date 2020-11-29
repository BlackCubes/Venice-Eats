import { SET_LOADER } from './../actions/ui';
import { API_POST_SUCCESS, API_SUCCESS, API_ERROR } from './../actions/api';

export default (
  state = {
    data: [],
    isLoading: false,
    error: null
  },
  action
) => {
  switch (action.type) {
    case API_POST_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.data.data]
      };
    case API_SUCCESS:
      return {
        ...state,
        data: action.payload.data.data
      };
    case API_ERROR:
      console.log(action.payload);
      return { ...state, error: action.payload.message };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
