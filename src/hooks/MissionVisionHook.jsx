import axios from 'axios';
import { API_BASE_URL } from 'services/API';
import { create } from 'zustand';
import * as Yup from 'yup';

const PATH = 'missionvission';

const useMissionVisionHook = create((set) => ({
  initialValues: { mission: '', vision: '' },
  validationSchema: Yup.object({
    mission: Yup.string().required('This field is required'),
    vision: Yup.string().required('This field is required')
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
      initialValues: { mission: '', vision: '' }
    }));
  },

  // GET MISSION AND VISION
  getMissionVision: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${PATH}`);
      const { mission, vision } = response.data.data;

      set(() => ({
        initialValues: {
          mission: mission,
          vision: vision
        }
      }));

      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch mission and vision: ' + error.message);
    }
  },

  // CREATE MISSION AND VISION
  createMissionVision: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
    return response.data;
  },

  // DELETE MISSION AND VISION
  deleteMissionVision: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
    return response.data;
  }
}));

export default useMissionVisionHook;
