import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'ourteam';

const useOurTeamHook = create((set, get) => ({
  isUpdateMode: false,
  initialValues: { fullname: '', position: '', message: '', avatar: '' },

  // Validation schema
  validationSchema: () => {
    return Yup.object({
      fullname: Yup.string().required('Name is required'),
      position: Yup.string().required('Position is required'),
      message: Yup.string().required('Message is required'),
      avatar: get().isUpdateMode
        ? Yup.mixed() // Not required in update mode
        : Yup.mixed()
            .required('Avatar is required')
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
      initialValues: { fullname: '', position: '', message: '', avatar: '' }
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
      initialValues: { fullname: '', position: '', message: '', avatar: '' },
      isUpdateMode: false
    }));

    return response.data;
  }
}));

export default useOurTeamHook;
