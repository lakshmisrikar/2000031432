import axios from 'axios';

const API_URL = 'http://104.211.219.98/train';

const registerCompany = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

const getAuthToken = (data) => {
  return axios.post(`${API_URL}/auth`, data);
};

const getAllTrains = (token) => {
  return axios.get(`${API_URL}/trains`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTrainById = (id, token) => {
  return axios.get(`${API_URL}/trains/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { registerCompany, getAuthToken, getAllTrains, getTrainById };