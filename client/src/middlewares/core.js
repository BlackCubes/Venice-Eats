import axios from 'axios';
import {
  API_AUTH_REQUEST,
  API_POST_REQUEST,
  API_GET_ALL_REQUEST,
  API_GET_REQUEST,
  API_UPDATE_REQUEST,
  API_DELETE_REQUEST,
  apiAuthSuccess,
  apiPostSuccess,
  apiGetAllSuccess,
  apiGetSuccess,
  apiUpdateSuccess,
  apiDeleteSuccess,
  apiError
} from './../actions/api';
import { setLoader } from './../actions/ui';

export const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case API_AUTH_REQUEST: {
      dispatch(setLoader({ state: true }));
      const { url, method, data } = action.meta;
      axios({
        method,
        url,
        data
      })
        .then(({ data }) => {
          dispatch(setLoader({ state: false }));
          dispatch(apiAuthSuccess({ response: data }));
        })
        .catch(error => {
          console.log(error.response.data);
          dispatch(setLoader({ state: false }));
          dispatch(apiError({ error: error.response.data }));
        });
      break;
    }
    case API_POST_REQUEST: {
      dispatch(setLoader({ state: true }));
      const { url, method, data, headers } = action.meta;
      axios({
        method,
        url,
        data,
        headers
      })
        .then(({ data }) => {
          dispatch(setLoader({ state: false }));
          dispatch(apiPostSuccess({ response: data }));
        })
        .catch(error => {
          console.log(error.response.data);
          dispatch(setLoader({ state: false }));
          dispatch(apiError({ error: error.response.data }));
        });
      break;
    }
    case API_GET_ALL_REQUEST: {
      dispatch(setLoader({ state: true }));
      const { url, method, headers } = action.meta;
      axios({
        method,
        url,
        headers
      })
        .then(({ data }) => {
          dispatch(setLoader({ state: false }));
          dispatch(apiGetAllSuccess({ response: data }));
        })
        .catch(error => {
          console.log(error.response.data);
          dispatch(setLoader({ state: false }));
          dispatch(apiError({ error: error.response.data }));
        });
      break;
    }
    case API_GET_REQUEST: {
      dispatch(setLoader({ state: true }));
      const { url, method, headers } = action.meta;
      axios({
        method,
        url,
        headers
      })
        .then(({ data }) => {
          dispatch(setLoader({ state: false }));
          dispatch(apiGetSuccess({ response: data }));
        })
        .catch(error => {
          console.log(error.response.data);
          dispatch(setLoader({ state: false }));
          dispatch(apiError({ error: error.response.data }));
        });
      break;
    }
    case API_UPDATE_REQUEST: {
      dispatch(setLoader({ state: true }));
      const { url, method, data, headers } = action.meta;
      axios({
        method,
        url,
        data,
        headers
      })
        .then(({ data }) => {
          dispatch(setLoader({ state: false }));
          dispatch(apiUpdateSuccess({ response: data }));
        })
        .catch(error => {
          console.log(error.response.data);
          dispatch(setLoader({ state: false }));
          dispatch(apiError({ error: error.response.data }));
        });
      break;
    }
    case API_DELETE_REQUEST: {
      dispatch(setLoader({ state: true }));
      const { url, method, headers, id } = action.meta;
      axios({
        method,
        url,
        headers
      })
        .then(res => {
          dispatch(setLoader({ state: false }));
          dispatch(apiDeleteSuccess({ response: id }));
        })
        .catch(error => {
          console.log(error.response.data);
          dispatch(setLoader({ state: false }));
          dispatch(apiError({ error: error.response.data }));
        });
      break;
    }
    default:
      break;
  }
};
