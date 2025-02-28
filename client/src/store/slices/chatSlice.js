import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChats, getMessages, createNewChat, sendMessage } from '../../api';
import {
  handlePending,
  handleFulfilled,
  handleRejected,
} from '../../utils/sliceUtils';

const initialState = {
  chats: [],
  currentChat: null,
  isLoading: false,
  error: null,
};

const SLICE_NAME = 'chat';

export const getAllChats = createAsyncThunk(
  `${SLICE_NAME}/getAllChats`,
  async (userId, thunkApi) => {
    try {
      const chats = await getChats(userId);
      return chats;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  `${SLICE_NAME}/getMessages`,
  async (chatId, thunkApi) => {
    try {
      return await getMessages(chatId);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const createChat = createAsyncThunk(
  'chats/createChat',
  async ({ chatName, userIds }, thunkApi) => {
    try {
      return await createNewChat(chatName, userIds);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const sendMessageToChat = createAsyncThunk(
  `${SLICE_NAME}/sendMessage`,
  async ({ chatId, text, authorId }, thunkApi) => {
    try {
      return await sendMessage({ chatId, text, authorId });
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.errors);
    }
  }
);

const chatSlice = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    selectCurrentChat: (state, action) => {
      state.currentChat = state.chats.find(
        (chat) => chat.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, handlePending)
      .addCase(getAllChats.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.chats = action.payload;
      })
      .addCase(getAllChats.rejected, handleRejected)

      .addCase(getAllMessages.pending, handlePending)
      .addCase(getAllMessages.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.currentChat.messages = action.payload;
      })
      .addCase(getAllMessages.rejected, handleRejected)

      .addCase(createChat.pending, handlePending)
      .addCase(createChat.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, handleRejected)

      .addCase(sendMessageToChat.pending, handlePending)
      .addCase(sendMessageToChat.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        Array.isArray(state.currentChat.messages)
          ? state.currentChat.messages.push(action.payload)
          : [action.payload];
      })
      .addCase(sendMessageToChat.rejected, handleRejected);
  },
});

const { reducer: chatReducer } = chatSlice;

export default chatReducer;
export const { selectCurrentChat } = chatSlice.actions;
