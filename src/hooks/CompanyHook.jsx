import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'companies';
const SINGULAR_PATH = 'company';

const useCompanyHook = create((set) => ({
  isUpdateMode: false,
  initialValues: { name: '', urlimage: null },
  validationSchema: Yup.object({
    name: Yup.string().required('Company name is required'),
    urlimage: Yup.mixed()
      .required('Image file is required') // Check if image file is not null
      .test('fileSize', 'The file is too large', (value) => {
        return value && value.size <= 2048 * 1024; // Max is 2MB in bytes [can be adjusted in the server]
      })
      .test('fileFormat', 'Unsupported File Format', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/svg'].includes(value.type); // Validate file type || only JPEG and PNG files are supported
      })
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
      initialValues: { name: '', urlimage: null }
    }));
  },

  // SWITCH UPDATE MODE
  setUpdateMode: (value) => set({ isUpdateMode: value }),

  // GET COMPANIES
  getCompanies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch companies: ' + error.message);
    }
  },

  // GET COMPANY
  getCompany: async (id) => {
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

  // CREATE COMPANY
  createCompany: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
  },

  // DELETE COMPANY
  deleteCompany: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
    return response.data;
  },

  // UPDATE COMPANY
  updateCompany: async (id) => {
    const response = await axios.put(`${API_BASE_URL}/${SINGULAR_PATH}/${id}`);
    set(() => ({
      initialValues: { name: '', imageurl: null },
      isUpdateMode: false
    }));

    return response.data;
  }
}));

export default useCompanyHook;
