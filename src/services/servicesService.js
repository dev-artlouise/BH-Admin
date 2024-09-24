import axios from 'axios';
import { API_BASE_URL } from "./API"

const PATH = 'services';

export const getServices = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${PATH}`);
        return response.data;
    } catch (error) {
        // You can handle the error here or rethrow it
        throw new Error('Failed to fetch companies: ' + error.message);
    }
};

export const createServices = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
};

export const deleteService = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
    return response.data;
};
