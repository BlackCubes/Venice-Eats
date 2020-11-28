import axios from 'axios';
import {
  API_AUTH_REQUEST,
  API_GET_ALL_REQUEST,
  apiAuthSuccess,
  apiSuccess,
  apiError
} from './../actions/api';
import { setLoader } from './../actions/ui';

export const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case API_AUTH_REQUEST: {
      dispatch(setLoader(true));
      const { url, method, data } = action.meta;
      axios({
        method,
        url,
        data
      })
        .then(({ data }) => dispatch(apiAuthSuccess({ response: data })))
        .catch(error => {
          console.log(error);
          dispatch(apiError({ error: error.response.data }));
        });
      break;
    }
    case API_GET_ALL_REQUEST: {
      dispatch(setLoader(true));
      const { url, method } = action.meta;
      axios({
        method,
        url
      })
        .then(({ data }) => dispatch(apiSuccess({ response: data })))
        .catch(error => {
          console.log(error);
          dispatch(apiError({ error: error.response.data }));
        });
      break;
    }
    default:
      break;
  }
  // if (action.type === API_POST_REQUEST) {
  //   dispatch(setLoader(true));
  //   const { url, method, data } = action.meta;
  //   axios({
  //     method,
  //     url,
  //     data
  //   })
  //     .then(({ data }) => dispatch(apiSuccess({ response: data })))
  //     .catch(error => {
  //       console.log(error);
  //       dispatch(apiError({ error: error.response.data }));
  //     });
  // }
};
