import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'hero-section';

const useHeroHook = create((set, get) => ({
  isUpdateMode: false,
  initialValues: { title: '', content: '', image: '' },
  validationSchema: () => {
    return get().isUpdateMode
      ? Yup.mixed() // Not required in update mode
      : Yup.object({
          title: Yup.string().required('Title is required'),
          content: Yup.string().required('This field is required'),
          image: Yup.mixed()
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
      initialValues: { title: '', content: '', image: '' }
    }));
  },

  // SWITCH UPDATE MODE
  setUpdateMode: (value) => set({ isUpdateMode: value }),

  // GET HEROES
  getContent: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}`);

      const { title, content } = response.data.data;
      set(() => ({
        initialValues: {
          title: title,
          content: content
        },
        isUpdateMode: true
      }));

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch companies: ' + error.message);
    }
  },

  // CREATE HERO
  createContent: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
  },

  // DELETE HERO
  deleteContent: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
    return response.data;
  },

  // UPDATE HERO
  updateContent: async (id, formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}/${id}?_method=PUT`, formData);

    return response.data;
  }
}));

export default useHeroHook;
