import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';

const { THEMES } = CONSTANTS;

const SLICE_NAME = 'theme';

const themeSlice = createSlice({
  name: SLICE_NAME,
  initialState: THEMES.DARK_THEME,
  reducers: {
    changeTheme: (state, action) => action.payload,
  },
});

const { reducer: themeReducer, actions } = themeSlice;

export default themeReducer;
export const { changeTheme } = actions;