import { createAction } from '@reduxjs/toolkit';
import ACTION_TYPES from './actionTypes';

// export const increment = () => ({
//   type: ACTION_TYPES.INCREMENT,
// });

// export const decrement = () => ({
//   type: ACTION_TYPES.DECREMENT,
// });

// export const setStep = (payload) => ({
//   type: ACTION_TYPES.SET_STEP,
//   payload,
// });

//  createAction  приймає стрінгу типу акшена і повертає готовий екшн креатор

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const setStep = createAction('setStep');
export const resetCounter = createAction('resetCounter');

// const act1 = increment();
// console.log('act1:');
// console.log(act1);

// const act2 = increment(50);
// console.log('act2:');
// console.log(act2);

// маючи екшн креатор ви можете дістати з нього екшн тайп
// console.log(increment.type); // increment
// console.log(increment.toString()); // increment

export const userAuthSuccess = (user) => ({
  type: ACTION_TYPES.USER_AUTH_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: ACTION_TYPES.USER_LOGOUT,
});

export const changeTheme = (newTheme) => ({
  type: ACTION_TYPES.CHANGE_THEME,
  payload: newTheme,
});
