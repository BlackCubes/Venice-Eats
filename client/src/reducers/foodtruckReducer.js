import { SET_LOADER } from './../actions/ui';
import {
  API_POST_SUCCESS,
  API_GET_ALL_SUCCESS,
  API_GET_SUCCESS,
  API_UPDATE_SUCCESS,
  API_DELETE_SUCCESS
} from './../actions/api';

export default (
  state = {
    datas: [],
    singleData: {},
    menus: [],
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case API_POST_SUCCESS:
      return {
        ...state,
        datas: [...state.datas, action.payload.data.data]
      };
    case API_GET_ALL_SUCCESS:
      return {
        ...state,
        datas: [...state.datas, action.payload.data.data]
      };
    case API_GET_SUCCESS && action.collectionName === 'foodtrucks':
      return {
        ...state,
        singleData: action.payload.data.data,
        menus: [...state.menus, action.payload.data.data.menus]
      };
    default:
      return state;
  }
};
