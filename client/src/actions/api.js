// ACTION TYPES
export const API_AUTH_REQUEST = 'API_AUTH_REQUEST';
export const API_POST_REQUEST = 'API_POST_REQUEST';
export const API_GET_ALL_REQUEST = 'API_GET_ALL_REQUEST';
export const API_GET_REQUEST = 'API_GET_REQUEST';
export const API_UPDATE_REQUEST = 'API_UPDATE_REQUEST';
export const API_DELETE_REQUEST = 'API_DELETE_REQUEST';
export const API_AUTH_SUCCESS = 'API_AUTH_SUCCESS';
export const API_POST_SUCCESS = 'API_POST_SUCCESS';
export const API_SUCCESS = 'API_SUCCESS';
export const API_DELETE_SUCCESS = 'API_DELETE_SUCCESS';
export const API_ERROR = 'API_ERROR';

// ACTION CREATORS
export const apiAuthRequest = ({ url, method, data }) => {
  return {
    type: API_AUTH_REQUEST,
    meta: { url, method, data }
  };
};

export const apiPostRequest = ({ url, method, data, headers }) => {
  return {
    type: API_POST_REQUEST,
    meta: { url, method, data, headers }
  };
};

export const apiGetAllRequest = ({ url, method, headers }) => {
  return {
    type: API_GET_ALL_REQUEST,
    meta: { url, method, headers }
  };
};

export const apiGetRequest = ({ url, method, headers }) => {
  return {
    type: API_GET_REQUEST,
    meta: { url, method, headers }
  };
};

export const apiUpdateRequest = ({ url, method, data, headers }) => {
  return {
    type: API_UPDATE_REQUEST,
    meta: { url, method, data, headers }
  };
};

export const apiDeleteRequest = ({ url, method, headers, id }) => {
  return {
    type: API_DELETE_REQUEST,
    meta: { url, method, headers, id }
  };
};

export const apiAuthSuccess = ({ response }) => ({
  type: API_AUTH_SUCCESS,
  payload: response
});

export const apiPostSuccess = ({ response }) => ({
  type: API_POST_SUCCESS,
  payload: response
});

export const apiSuccess = ({ response }) => ({
  type: API_SUCCESS,
  payload: response
});

export const apiDeleteSuccess = ({ response }) => ({
  type: API_DELETE_SUCCESS,
  payload: response
});

export const apiError = ({ error }) => ({
  type: API_ERROR,
  payload: error
});
