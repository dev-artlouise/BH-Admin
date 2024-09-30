import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'aboutus';

const useAboutUsHook = create((set) => ({
  isUpdateMode: false,
  initialValues: { title: '', content: '' },

  validationSchema: Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required')
  }),

  // SWITCH UPDATE MODE
  setUpdateMode: (value) => set({ isUpdateMode: value }),

  // SERVICE CONTENT
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

  // CONTENT SECTION
  getContent: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}`);
      const { title, content } = response.data.data;

      set(() => ({
        initialValues: {
          title: title,
          content: content
        }
      }));
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data: ' + error.message);
    }
  },

  createContent: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
  }
}));

export default useAboutUsHook;
