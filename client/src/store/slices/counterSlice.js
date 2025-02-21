import { createSlice } from '@reduxjs/toolkit';

/*
  Слайс - шматочок стану редаксу
  створюється через createSlice. Функція приймає об'єкт налаштувань
  в якому вказуються наступні властивості
    initialState - стан слайсу
    name - стрінга, яка виступає "префіксом" для екшн тайпів цього слайсу
    reducers - об'єкт з мініредюсерами на кожен кейс слайса

  counter/increment
  balance/increment
  counter/decrement
*/

const SLICE_NAME = 'counter';

const initialState = {
  count: 0,
  step: 1,
};

const counterSlice = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    increment: (state, action) => {
      state.count += state.step;
    },
    decrement: (state) => {
      state.count -= state.step;
    },
    setStep: (state, action) => {
      state.step = !isNaN(+action.payload) ? +action.payload : state.step;
    },
    reset: () => {
      return initialState;
    },
  },
});

// reducer - готовий до роботи редюсер, actions - об'єкт з екшн креаторами
const { reducer: counterReducer, actions } = counterSlice;

export default counterReducer;

export const { increment, decrement, setStep, reset } = actions;
