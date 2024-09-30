import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'companies';

const useCompanyHook = create((set, get) => ({
  isUpdateMode: false,
  initialValues: { name: '', urlimage: '' },
  validationSchema: () => {
    return Yup.object({
      name: Yup.string().required('Company name is required'),
      urlimage: get().isUpdateMode
        ? Yup.mixed() // Not required in update mode
        : Yup.mixed()
            .required('Image file is required') // Check if image file is not null
            .test('fileSize', 'The file is too large', (value) => {
              return value && value.size <= 2048 * 1024; // Max is 2MB in bytes [can be adjusted in the server]
            })
            .test('fileFormat', 'Unsupported File Format', (value) => {
              return value && ['image/jpeg', 'image/png'].includes(value.type); // Validate file type || only JPEG and PNG files are supported
            })
    });
  },

  setInitialValues: (field, value) =>
    set((state) => ({
      initialValues: {
        ...state.initialValues,
        [field]: value
      }
    })),

  resetInitialValues: () => {
    set(() => ({
      initialValues: { name: '', urlimage: '' }
    }));
  },

  // SWITCH UPDATE MODE
  setUpdateMode: (value) => set({ isUpdateMode: value }),

  // GET COMPANIES
  getLists: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data: ' + error.message);
    }
  },

  // GET COMPANY
  getList: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}/${id}`);
      const { name } = response.data.data;
      set(() => ({
        initialValues: {
          id: id,
          name: name,
          urlimage: ''
        },
        isUpdateMode: true
      }));
    } catch (error) {
      throw new Error('Failed to fetch data: ' + error.message);
    }
  },

  // CREATE COMPANY
  createList: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
  },

  // DELETE COMPANY
  deleteList: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
    return response.data;
  },

  // UPDATE COMPANY
  updateList: async (id, formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}/${id}?_method=PUT`, formData);
    set(() => ({
      initialValues: { name: '', urlimage: '' },
      isUpdateMode: false
    }));

    return response.data;
  }
}));

export default useCompanyHook;
