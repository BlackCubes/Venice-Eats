// ACTION TYPE
export const SET_LOADER = 'SET_LOADER';

// ACTION CREATOR
export const setLoader = ({ state }) => ({
  type: SET_LOADER,
  payload: state
});
