// ACTION TYPES
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// ACTION CREATORS
export const login = user => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
