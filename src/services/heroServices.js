// heroServices.js
import axios from 'axios';
import { API_BASE_URL } from './API';

const PATH = 'hero-section'

export const createHero = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
};

export const getHeroContent = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${PATH}`);

        return response.data
    } catch (error) {
        // You can handle the error here or rethrow it
        throw new Error('Failed to fetch hero Contents: ' + error.message);
    }
}
