import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000'
});

export async function registerUser(userData) {
  const response = await httpClient.post('/auth/registration', userData);

  const { data: { data : user}} = response;

  return user;
}

export async function login(userData) {
  const { data: {data: user}} = await httpClient.post('/auth/login', userData);

  return user;
}

export async function refreshSession(userId) {
  const { data: {data: user}} = await httpClient.post('/auth/refresh', { userId});

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