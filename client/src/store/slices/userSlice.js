import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const SLICE_NAME = 'user';

const userSlice = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    userAuthSuccess: (state, action) => {
      state.user = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

export default userReducer;
export const { userAuthSuccess, logout } = actions;