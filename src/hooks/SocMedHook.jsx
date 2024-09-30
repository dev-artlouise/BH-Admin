import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'socmed';

const useSocMedHook = create((set, get) => ({
  isUpdateMode: false,
  initialValues: { title: '', logo: '' },
  validationSchema: () => {
    return Yup.object({
      title: Yup.string().required('Title is required'),
      logo: get().isUpdateMode
        ? Yup.mixed() // Not required in update mode
        : Yup.mixed()
            .required('Logo is required')
            .test('fileFormat', 'Unsupported File Format', (value) => {
              return !value || ['image/jpeg', 'image/png'].includes(value?.type); // Validate file type
            })
            .test('fileSize', 'The file is too large', (value) => {
              return value && value.size <= 2048 * 1024; // Max is 2MB in bytes [can be adjusted in the server]
            })
    });
  },

  // SWITCH UPDATE MODE
  setUpdateMode: (value) => set({ isUpdateMode: value }),

  setInitialValues: (field, value) =>
    set((state) => ({
      initialValues: {
        ...state.initialValues,
        [field]: value
      }
    })),

  resetInitialValues: () => {
    set(() => ({
      initialValues: { title: '', logo: '' }
    }));
  },

  getLists: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data: ' + error.message);
    }
  },

  getList: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}/${id}`);
      const { title } = response.data.data;
      set(() => ({
        initialValues: {
          id: id,
          title: title,
          logo: ''
        },
        isUpdateMode: true
      }));
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data: ' + error.message);
    }
  },

  createList: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
  },

  deleteList: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
    return response.data;
  },

  updateList: async (id, formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}/${id}?_method=PUT`, formData);
    set(() => ({
      initialValues: { title: '', logo: '' },
      isUpdateMode: false
    }));

    return response.data;
  }
}));

export default useSocMedHook;
