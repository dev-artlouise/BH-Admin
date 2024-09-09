import axios from 'axios';
import { API_BASE_URL } from './API';

const PATH = 'companies';

export const createCompany = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/${PATH}`, formData);
  return response.data;
};

export const getCompanies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${PATH}`);

    return response.data;
  } catch (error) {
    // You can handle the error here or rethrow it
    throw new Error('Failed to fetch companies: ' + error.message);
  }
};

export const deleteCompany = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${PATH}/${id}`);
  return response.data;
};

// export const deleteCompany = async (id) => {
// const response = await fetch(`${API_BASE_URL}/${PATH}/${id}`, {
//   method: 'DELETE'
// });
// if (!response.ok) {
//   throw new Error('Network response was not ok');
// }
// return response.json(); // Adjust based on your API response
// };

// export const useCreateCompany = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createCompany,
//     onSuccess: (newCompany) => {
//       // update the query data directly
//       queryClient.setQueryData(['companies'], (oldData) => {
//         // Assuming oldData is an array of companies
//         return [...oldData, newCompany.data];
//       });
//     }
//   });
// };
