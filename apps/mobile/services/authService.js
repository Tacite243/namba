import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

const login = async (phoneNumber, password) => {
  const response = await axios.get(`${API_URL}/login`, { phoneNumber, password });
  return response.data.token;
};

const logout = async () => {
  await axios.post(`${API_URL}/logout`);
};

export default { login, logout };