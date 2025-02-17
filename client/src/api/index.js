import axios from 'axios';
import CONSTANTS from '../constants';
import { checkToken } from '../utils/tokenUtils';

const httpClient = axios.create({
  baseURL: CONSTANTS.SERVER_URL
});

let accessTokenInMemory = null;

function setTokens (tokenPair) {
  const { accessToken, refreshToken } = tokenPair;
  // зберігаємо наші токени
  accessTokenInMemory = accessToken;
  // console.log(`Access token: ${accessTokenInMemory}`);
  window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN_KEY, refreshToken);
}

function clearTokens () {
  accessTokenInMemory = null;
  localStorage.removeItem(CONSTANTS.REFRESH_TOKEN_KEY);
}

// додавання перехоплювачів на запит
httpClient.interceptors.request.use(async function (config) {
  // зробити щось до відправки запиту

  if(config.url.includes('auth')) {
    return config;
  }

  // 1. знаходимо акцесс і рефреш токени
  const refreshTokenFromLS = localStorage.getItem('refreshToken');
  
  // 2. треба перевірити чи валідні ці токени

  const isAccessValid = checkToken(accessTokenInMemory);
  const isRefreshValid = checkToken(refreshTokenFromLS);

  if(isAccessValid) {
    // 2.1 якщо всі токени валідні то встановлюґємо аккцесс токен у заголовок
    config.headers.Authorization = `Bearer ${accessTokenInMemory}`;
  } else if(isRefreshValid) {
    // 2.2 якщо акцесс невалідний а рефреш валідний - маємо зробити рефреш запит і оновити обидва токени

    const {
      data: {
        data: { tokenPair }
      }
    } = await axios.post(`${CONSTANTS.SERVER_URL}/auth/refresh`, { refreshToken : refreshTokenFromLS });

    setTokens(tokenPair);

    config.headers.Authorization = `Bearer ${accessTokenInMemory}`;
  } else {
    // 2.3 якщо обидва невалідні то пролітаємо
    clearTokens();
  }

  return config;
}, function (error) {
  // зробити щось у випадку помилки при запиті
  return Promise.reject(error);
});

// додавання перехоплювачів на відповідь
httpClient.interceptors.response.use(function (response) {
  // перехоплювач працює для всіх запитів з статус кодами 2xx серії
  // щось зробити з даними з відповіді

  // перевірити чи є у відповіді токени
  if(response?.data?.data?.tokenPair) {
    const { tokenPair } = response.data.data;

    setTokens(tokenPair);  
  }

  return response;
}, function (error) {
  // коллбек помилки запускається для всіх кодів поза 200 серією
  // зробити щось до обробки помилки
  return Promise.reject(error);
});

export async function registerUser(userData) {
  const response = await httpClient.post('/auth/registration', userData);

  const { data: { data : {user}}} = response;

  return user;
}

export async function login(userData) {
  const { data: {data: {user}}} = await httpClient.post('/auth/login', userData);

  return user;
}

export const logout = () => {
  clearTokens();
}

export async function refreshSession(refreshToken) {
  const { data: {data: {user}}} = await httpClient.post('/auth/refresh', { refreshToken});

  return user;
}

export async function getUser(userId) {
  const response = await httpClient.get(`/users/${userId}`);

  const { data: { data : user}} = response;

  return user;
}

export async function getUsers() {
  const response = await httpClient.get('/users');

  const { data: { data : users}} = response;

  return users;
}

export async function updateUser(userId ,userData) {
  const response = await httpClient.put(`/users/${userId}`, userData);

  const { data: { data : user}} = response;

  return user;
}

export async function deleteUser(userId) {
  const response = await httpClient.delete(`/users/${userId}`);

  const { data: { data : user}} = response;

  return user;
}