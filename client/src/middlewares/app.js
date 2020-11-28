import { apiPostRequest } from './../actions/api';
import { LOGIN } from './../actions/auth';

export const appMiddleware = () => next => action => {
  next(action);
  switch (action.type) {
    case LOGIN: {
      next(
        apiPostRequest({
          url: `${process.env.REACT_APP_SERVER_URL}/admins/login`,
          method: 'POST',
          data: action.payload
        })
      );
      break;
    }
    default:
      break;
  }
};
