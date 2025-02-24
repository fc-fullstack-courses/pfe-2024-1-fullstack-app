import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';

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
      const user = await API.refreshSession(refreshToken);
  
      // якщо з коллбека щось повернути це сигналізує що можемо запускати екнш на успішне отримання даних
      return user;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const login = createAsyncThunk(
  `${SLICE_NAME}/login`,
  async (userData, thunkApi) => {
    try {
      const user = await API.login(userData);

      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

const register = createAsyncThunk(
  `${SLICE_NAME}/registerUser`,
  async (userData, thunkApi) => {
    try {
      const user = await API.registerUser(userData);

      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: SLICE_NAME,
  // тут тількі синхронні екшени які пов'язані з цим слайсом
  reducers: {
    logout: () => {
      API.logout();
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

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

const { reducer: userReducer, actions } = userSlice;

export default userReducer;
export const { logout } = actions;
export { refresh, login, register };
