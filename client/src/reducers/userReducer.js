import { SET_LOADER } from './../actions/ui';
import {
  API_POST_SUCCESS,
  API_GET_ALL_SUCCESS,
  API_GET_SUCCESS,
  API_UPDATE_SUCCESS,
  API_DELETE_SUCCESS,
  API_ERROR
} from './../actions/api';

export default (
  state = {
    data: [],
    singleData: {},
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
    case API_GET_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload.data.data
      };
    case API_GET_SUCCESS:
    case API_UPDATE_SUCCESS:
      return {
        ...state,
        singleData: action.payload.data.data
      };
    case API_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el._id !== action.payload)
      };
    case API_ERROR:
      return { ...state, error: action.payload.message };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
