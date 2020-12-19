import { SET_LOADER } from './../actions/ui';
import {
  API_POST_SUCCESS,
  API_GET_ALL_SUCCESS,
  API_GET_SUCCESS,
  API_UPDATE_SUCCESS,
  API_DELETE_SUCCESS
  // API_ERROR
} from './../actions/api';

export default (
  state = {
    datas: [],
    singleData: {},
    isLoading: false
    // error: null
  },
  action
) => {
  switch (action.type) {
    case 'API_POST_ADMINS_SUCCESS':
      return {
        ...state,
        datas: [...state.datas, action.payload.data.data]
      };
    case 'API_GET_ALL_ADMINS_SUCCESS':
      return {
        ...state,
        datas: action.payload.data.data
      };
    // case API_GET_SUCCESS:
    // case API_UPDATE_SUCCESS:
    case 'API_GET_ADMINS_SUCCESS':
    case 'API_UPDATE_ADMINS_SUCCESS':
      return {
        ...state,
        singleData: action.payload.data.data
      };
    case 'API_DELETE_ADMINS_SUCCESS':
      return {
        ...state,
        datas: state.datas.filter(el => el._id !== action.payload)
      };
    // case API_ERROR:
    //   return { ...state, error: action.payload.message };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
