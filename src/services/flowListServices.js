// heroServices.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const createFlowList = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/flowList`, formData);
    return response.data;
};

export const getFlowList = async () => {
    const response = await axios.get(`${API_BASE_URL}/flowList`);
    return response.data;
};

export const deleteFlowItem = async (id) => {
    const response = await fetch(`/api/flowList/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json(); // Adjust based on your API response
};
