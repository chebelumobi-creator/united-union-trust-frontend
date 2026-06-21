import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/register/', data);
export const loginUser = (data) => API.post('/login/', data);
export const logoutUser = (data) => API.post('/logout/', data);
export const refreshToken = (data) => API.post('/token/refresh/', data);

// Profile
export const getProfile = () => API.get('/profile/');
export const updateProfile = (data) => API.put('/profile/update/', data);

// Banking
export const transferMoney = (data) => API.post('/transfer/', data);
export const domesticTransfer = (data) => API.post('/domestic-transfer/', data);
export const wireTransfer = (data) => API.post('/wire-transfer/', data);
export const getHistory = () => API.get('/history/');
export const depositMoney = (data) => API.post('/deposit/', data);
export const withdrawMoney = (data) => API.post('/withdraw/', data);
export const deleteTransaction = (id) => API.delete(`/transaction/${id}/delete/`);