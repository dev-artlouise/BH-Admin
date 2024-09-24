import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'hero-section';
const SINGULAR_PATH = 'hero-section';

const useProcessHook = create((set) => ({
  isUpdateMode: false,
  initialValues: { title: '', content: '' },
  validationSchema: Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('This field is required')
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
      initialValues: { title: '', content: '' }
    }));
  },

  // SWITCH UPDATE MODE
  setUpdateMode: (value) => set({ isUpdateMode: value }),

  // GET PROCESSES
  getProcesses: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch processses: ' + error.message);
    }
  },

  // GET PROCESSES
  getProcess: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${SINGULAR_PATH}/${id}`);
      set(() => ({
        initialValues: { ...response.data, urlimageold: response.data.urlimage },
        isUpdateMode: true
      }));
    } catch (error) {
      throw new Error('Failed to fetch companies: ' + error.message);
    }
  },

  // CREATE PROCESSES
  createProcess: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
  },

  // DELETE PROCESSES
  deleteProcess: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
    return response.data;
  },

  // UPDATE PROCESSES
  updateProcess: async (id) => {
    const response = await axios.put(`${API_BASE_URL}/${SINGULAR_PATH}/${id}`);
    set(() => ({
      initialValues: { title: '', content: '', image: null },
      isUpdateMode: false
    }));

    return response.data;
  }
}));

export default useProcessHook;
