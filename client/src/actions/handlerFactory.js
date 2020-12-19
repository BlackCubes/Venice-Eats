// ACTION TYPES
export const POST_ONE = 'POST_ONE';
export const GET_ALL = 'GET_ALL';
export const GET_ONE = 'GET_ONE';
export const UPDATE_ONE = 'UPDATE_ONE';
export const DELETE_ONE = 'DELETE_ONE';

// ACTION CREATORS
export const postOne = (path, data) => {
  return {
    type: POST_ONE,
    payload: { path, data }
  };
};

export const getAll = path => {
  return {
    type: GET_ALL,
    payload: { path }
  };
};

export const getOne = (path, params, collectionName) => {
  return {
    type: GET_ONE,
    payload: { path, params, collectionName }
  };
};

export const updateOne = (path, params, data) => {
  return {
    type: UPDATE_ONE,
    payload: { path, params, data }
  };
};

export const deleteOne = (path, id) => {
  return {
    type: DELETE_ONE,
    payload: { path, id }
  };
};
