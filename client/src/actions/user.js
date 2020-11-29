// ACTION TYPES
export const POST_USER = 'POST_USER';
export const GET_USERS = 'GET_USERS';

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
