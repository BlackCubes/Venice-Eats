// ACTION TYPES
export const API_POST_REQUEST = 'API_POST_REQUEST';
export const API_GET_ALL_REQUEST = 'API_GET_ALL_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';

// ACTION CREATORS
export const apiPostRequest = ({ url, method, data }) => {
  return {
    type: API_POST_REQUEST,
    meta: { url, method, data }
  };
};

export const apiGetAllRequest = ({ url, method }) => {
  return {
    type: API_GET_ALL_REQUEST,
    meta: { url, method }
  };
};

export const apiSuccess = ({ response }) => ({
  type: API_SUCCESS,
  payload: response
});

export const apiError = ({ error }) => ({
  type: API_ERROR,
  payload: error
});
