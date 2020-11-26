// ACTION TYPES
export const API_REQUEST = 'API_REQUEST';

// ACTION CREATORS
export const apiRequest = ({ url, method, data }) => {
  return {
    type: API_REQUEST,
    meta: { url, method, data }
  };
};
