import ACTION_TYPES from './actionTypes';

export const increment = () => ({
  type: ACTION_TYPES.INCREMENT,
});

export const decrement = () => ({
  type: ACTION_TYPES.DECREMENT,
});

export const setStep = (payload) => ({
  type: ACTION_TYPES.SET_STEP,
  payload,
});

export const userAuthSuccess = (user) => ({
  type: ACTION_TYPES.USER_AUTH_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: ACTION_TYPES.USER_LOGOUT,
});
