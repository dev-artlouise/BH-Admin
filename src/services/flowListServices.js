// heroServices.js
import axios from 'axios';
import { API_BASE_URL } from './API';

const PATH = 'flowList';

export const createFlowList = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
  return response.data;
};

export const getFlowList = async () => {
  const response = await axios.get(`${API_BASE_URL}/${PATH}`);
  return response.data;
};

export const deleteFlowItem = async (id) => {
  const response = await fetch(`/api/${PATH}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json(); // Adjust based on your API response
};
