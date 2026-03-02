import api from './client.js';

export const getAllStudents = async () => {
  const response = await api.get('/api/students');
  return response.data;
};

export const createStudent = async (data) => {
  const response = await api.post('/api/students', data);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await api.put(`/api/students/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id) => {
  await api.delete(`/api/students/${id}`);
};
