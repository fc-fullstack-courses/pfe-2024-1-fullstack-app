import { io } from "socket.io-client";
import CONSTANTS from "../constants";
import store from '../store';
import { newMessage, newMessageError } from "../store/slices/chatSlice";

// socket - екземпляр з'єднання з сервером
const socket = io(CONSTANTS.WS_SERVER_URL);

export const userBtnClick = (currentTheme) => {
  // emit - випромінюємо подію з клієнта на сервер
  // 1 аргумент - назва події
  // всі наступні аргументи після першого будуь доступні у коллбеці на сервері
  socket.emit('userBtnClick', 10, 'test', [true, false, false, false], currentTheme);
}

// реагуємо на подію userBtnClick з сервера
socket.on('userBtnClick', (param1, param2, param3, param4) => {
  alert('userBtnClick from server');

  console.log(param1);
  console.log(param2); 
  console.log(param3); 
  console.log(param4); 
});

export const sendNewChatMessage = (messageData) => {
  socket.emit('newChatMessage', messageData);
}

socket.on('newChatMessage', (newMessageData) => {
  store.dispatch(newMessage(newMessageData))
});

socket.on('newChatMessageError', (error) => {
  store.dispatch(newMessageError(error));
});
