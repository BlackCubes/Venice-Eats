import {
  apiAuthRequest,
  apiPostRequest,
  apiGetAllRequest,
  apiGetRequest,
  apiUpdateRequest,
  apiDeleteRequest
} from './../actions/api';
import { LOGIN, tokenHeadersConfig } from './../actions/auth';
import {
  POST_ONE,
  GET_ALL,
  GET_ONE,
  UPDATE_ONE,
  DELETE_ONE
} from './../actions/handlerFactory';

export const appMiddleware = ({ getState }) => next => action => {
  next(action);
  switch (action.type) {
    case LOGIN: {
      next(
        apiAuthRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/admins/login`,
          method: 'POST',
          data: action.payload
        })
      );
      break;
    }
    case POST_ONE: {
      next(
        apiPostRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${action.payload.path}`,
          method: 'POST',
          data: action.payload.data,
          headers: tokenHeadersConfig(getState)
        })
      );
      break;
    }
    case GET_ALL: {
      next(
        apiGetAllRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${action.payload.path}`,
          method: 'GET',
          headers: tokenHeadersConfig(getState)
        })
      );
      break;
    }
    case GET_ONE: {
      next(
        apiGetRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${action.payload.path}/${action.payload.params}`,
          method: 'GET',
          headers: tokenHeadersConfig(getState)
        })
      );
      break;
    }
    case UPDATE_ONE: {
      next(
        apiUpdateRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${action.payload.path}/${action.payload.params}`,
          method: 'PATCH',
          data: action.payload.data,
          headers: tokenHeadersConfig(getState)
        })
      );
      break;
    }
    case DELETE_ONE: {
      next(
        apiDeleteRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${action.payload.path}/${action.payload.id}`,
          method: 'DELETE',
          headers: tokenHeadersConfig(getState),
          id: action.payload.id
        })
      );
      break;
    }
    default:
      break;
  }
};
