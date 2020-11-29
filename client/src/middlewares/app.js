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
  POST_USER,
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER
} from './../actions/user';

const FOODTRUCK_ROUTE = 'foodtrucks';
const GEO_ROUTE = 'geos';
const USER_ROUTE = 'admins';
const VENICEEVENT_ROUTE = 'veniceevents';

export const appMiddleware = ({ getState }) => next => action => {
  next(action);
  switch (action.type) {
    case LOGIN: {
      next(
        apiAuthRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${USER_ROUTE}/login`,
          method: 'POST',
          data: action.payload
        })
      );
      break;
    }
    case POST_USER: {
      next(
        apiPostRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${USER_ROUTE}`,
          method: 'POST',
          data: action.payload,
          headers: tokenHeadersConfig(getState)
        })
      );
      break;
    }
    case GET_USERS: {
      next(
        apiGetAllRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${USER_ROUTE}`,
          method: 'GET',
          headers: tokenHeadersConfig(getState)
        })
      );
      break;
    }
    case GET_USER: {
      next(
        apiGetRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${USER_ROUTE}/${action.payload}`,
          method: 'GET',
          headers: tokenHeadersConfig(getState)
        })
      );
      break;
    }
    case UPDATE_USER: {
      next(
        apiUpdateRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${USER_ROUTE}/${action.payload.id}`,
          method: 'PATCH',
          data: action.payload.data,
          headers: tokenHeadersConfig(getState)
        })
      );
      break;
    }
    case DELETE_USER: {
      next(
        apiDeleteRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/${USER_ROUTE}/${action.payload}`,
          method: 'DELETE',
          headers: tokenHeadersConfig(getState),
          id: action.payload
        })
      );
      break;
    }
    default:
      break;
  }
};
