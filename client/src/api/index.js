import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000'
});

let accessTokenInMemory = null;

// додавання перехоплювачів на запит
httpClient.interceptors.request.use(function (config) {
  // зробити щось до відправки запиту

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
    const { accessToken, refreshToken } = response.data.data.tokenPair;

    // зберігаємо наші токени
    accessTokenInMemory = accessToken;
    console.log(`Access token: ${accessTokenInMemory}`);
    window.localStorage.setItem('refreshToken', refreshToken);
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
  window.localStorage.removeItem('refresh');
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