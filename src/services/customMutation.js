import { useMutation, useQueryClient } from 'react-query';

export const useCustomMutation = (mutationFn, queryKey, onSuccess, onError) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries(queryKey); //  To ensure the app is in sync with the latest data from the server.
      }

      if (onSuccess) {
        onSuccess(data); // Pass data to the onSuccess callback
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error); // Pass error to the onError callback
      }
    }
  });
};
