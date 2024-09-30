import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'whyus';

const useWhyUsHook = create((set) => ({
  isUpdateMode: false,
  initialValues: { title: '', content: '' },
  initialValuesList: { title: '', content: '', logo_url: null },
  validationSchema: Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required')
  }),
  validationSchemaList: Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    logo_url: Yup.mixed()
      .required('Logo is required') // Check if image file is not null
      .test('fileSize', 'The file is too large', (value) => {
        return value && value.size <= 2048 * 1024; // Max is 2MB in bytes [can be adjusted in the server]
      })
      .test('fileFormat', 'Unsupported File Format', (value) => {
        return value && ['image/jpeg', 'image/png'].includes(value.type); // Validate file type || only JPEG and PNG files are supported
      })
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
  },

  // LIST SECTION
  setInitialValuesList: (field, value) =>
    set((state) => ({
      initialValuesList: {
        ...state.initialValuesList,
        [field]: value
      }
    })),

  resetInitialValuesList: () => {
    set(() => ({
      initialValuesList: { title: '', content: '', logo_url: null }
    }));
  },

  getLists: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}list`);

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch companies: ' + error.message);
    }
  },

  getList: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${SINGULAR_PATH}List/${id}`);
      // set(() => ({
      //   initialValues: { ...response.data, urlimageold: response.data.urlimage },
      //   isUpdateMode: true
      // }));

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch companies: ' + error.message);
    }
  },

  createList: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}list`, formData);
    return response.data;
  },

  deleteList: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}list/${id}`);
    return response.data;
  },

  updateList: async (id) => {
    const response = await axios.put(`${API_BASE_URL}/${SINGULAR_PATH}list/${id}`);
    set(() => ({
      initialValues: { title: '', content: '', logo_url: null },
      isUpdateMode: false
    }));

    return response.data;
  }
}));

export default useWhyUsHook;
