import api from './client.js';

export const register = async (username, password) => {
  const response = await api.post('/reg-user', { username, password });
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post('/apis/login', { username, password });
  return response.data;
};
