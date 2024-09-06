import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const createCompany = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/companies`, formData);
    return response.data;
};

export const getCompanies = async () => {
    const response = await axios.get(`${API_BASE_URL}/companies`);
    return response.data;
};

export const deleteCompany = async (id) => {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json(); // Adjust based on your API response
};
