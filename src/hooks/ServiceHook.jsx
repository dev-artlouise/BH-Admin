import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'service-list';
const SINGULAR_PATH = 'service-list';

const useServiceHook = create((set) => ({
  isUpdateMode: false,
  initialValues: { serviceTitle: '', serviceContent: '', serviceLogo: null },
  validationSchema: Yup.object({
    serviceTitle: Yup.string().required('Title is required'),
    serviceContent: Yup.string().required('Content is required'),
    serviceLogo: Yup.mixed()
      .required('Logo is required') // Check if image file is not null
      .test('fileSize', 'The file is too large', (value) => {
        return value && value.size <= 2048 * 1024; // Max is 2MB in bytes [can be adjusted in the server]
      })
      .test('fileFormat', 'Unsupported File Format', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/svg+xml'].includes(value.type); // Validate file type || only JPEG and PNG files are supported
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
      initialValues: { serviceTitle: '', serviceContent: '', serviceLogo: null }
    }));
  },

  // SWITCH UPDATE MODE
  setUpdateMode: (value) => set({ isUpdateMode: value }),

  // GET HEROES
  getServices: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch companies: ' + error.message);
    }
  },

  // GET SERVICE
  getService: async (id) => {
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

  // CREATE SERVICE
  createService: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
  },

  // DELETE SERVICE
  deleteService: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
    return response.data;
  },

  // UPDATE SERVICE
  updateService: async (id) => {
    const response = await axios.put(`${API_BASE_URL}/${SINGULAR_PATH}/${id}`);
    set(() => ({
      initialValues: { serviceTitle: '', serviceContent: '', serviceLogo: null },
      isUpdateMode: false
    }));

    return response.data;
  }
}));

export default useServiceHook;
