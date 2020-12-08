// ACTION TYPES
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// ACTION CREATORS
export const login = (user, isMountedRef) => {
  return {
    type: LOGIN,
    payload: { user, isMountedRef }
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const tokenHeadersConfig = getState => {
  const { token } = getState().auth;

  const headersConfig = {
    'Content-type': 'application/json'
  };

  if (token) headersConfig.Authorization = `Bearer ${token}`;

  return headersConfig;
};
