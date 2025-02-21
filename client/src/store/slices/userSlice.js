import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { refreshSession } from '../../api';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const SLICE_NAME = 'user';

/*
  createAsyncThunk - функція для полегшення стоврення асинхронних запитів у редаксі
    приймає:
      1. приставка для екшн тайпів, пов'язаних з запитом
      2. асинхрона функція
*/
const refresh = createAsyncThunk(
  `${SLICE_NAME}/refresh`,
  async (refreshToken, thunkAPI) => {
    try {
      // console.log(refreshToken);
      const user = await refreshSession(refreshToken);
  
      // якщо з коллбека щось повернути це сигналізує що можемо запускати екнш на успішне отримання даних
      return user;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: SLICE_NAME,
  // тут тількі синхронні екшени які пов'язані з цим слайсом
  reducers: {
    // userAuthSuccess: (state, action) => {
    //   state.user = action.payload;
    // },
    logout: () => {
      return initialState;
    },
  },
  // тут реакції на інші екшени, в тому числі асинхроні
  extraReducers: (builder) => {

    // описуємо що відбувається коли запит ініціюється
    builder.addCase(refresh.pending, (state) => {
      state.isLoading = true;
    });

    // описуємо що відбувається коли запит виконаний успішно
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    // описуємо що відбувається коли запит виконаний неуспішно
    builder.addCase(refresh.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

const { reducer: userReducer, actions } = userSlice;

export default userReducer;
export const { userAuthSuccess, logout } = actions;
export { refresh };
