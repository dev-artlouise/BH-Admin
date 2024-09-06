// heroServices.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const createHero = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/hero-section`, formData);
    return response.data;
};
