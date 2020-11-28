import { apiAuthRequest, apiGetAllRequest } from './../actions/api';
import { LOGIN, tokenHeadersConfig } from './../actions/auth';
import { GET_USERS } from './../actions/user';

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
    default:
      break;
  }
};
