// ACTION TYPES
export const POST_USER = 'POST_USER';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

// ACTION CREATORS
export const postUser = data => {
  return {
    type: POST_USER,
    payload: data
  };
};

export const getUsers = () => {
  return {
    type: GET_USERS
  };
};

export const getUser = params => {
  return {
    type: GET_USER,
    payload: params
  };
};

export const updateUser = (id, data) => {
  return {
    type: UPDATE_USER,
    payload: { id, data }
  };
};

export const deleteUser = id => {
  return {
    type: DELETE_USER,
    payload: id
  };
};
