import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'reputation';

const useReputationHook = create((set) => ({
  initialValues: { year_in_business: '', project_delivered: '', satisfied_customer: '' },
  validationSchema: Yup.object({
    year_in_business: Yup.string().required('This field is required'),
    project_delivered: Yup.string().required('This field is required'),
    satisfied_customer: Yup.string().required('This field is required')
  }),

  setInitialValues: (field, value) =>
    set((state) => ({
      initialValues: {
        ...state.initialValues,
        [field]: value
      }
    })),

  resetInitialValues: () => {
    set(() => ({
      initialValues: { year_in_business: '', project_delivered: '', satisfied_customer: '' }
    }));
  },

  // GET REPUTATION
  getReputation: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}`);
      const { year_in_business, project_delivered, satisfied_customer } = response.data.data;

      set(() => ({
        initialValues: {
          year_in_business,
          project_delivered,
          satisfied_customer
        }
      }));

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch reputation: ' + error.message);
    }
  },

  // CREATE REPUTATION
  createReputation: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
  },

  // DELETE REPUTATION
  deleteReputation: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
    return response.data;
  }
}));

export default useReputationHook;
