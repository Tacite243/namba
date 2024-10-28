// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.token; // Récupère le token depuis la réponse
};

const logout = async () => {
  await axios.post(`${API_URL}/logout`);
};

export default { login, logout };