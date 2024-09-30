import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import useProcessHook from 'hooks/ProcessHook';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

const ProcessContent = () => {
  // Hook for managing data and state
  const { getContent } = useProcessHook();

  // Query to fetch the list
  const { data: { data: process = {} } = [] } = useQuery('process', getContent, { refetchOnWindowFocus: false });

  return (
    <Fragment>
      <MainCard title="Process Content Preview" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
        {/* Confirmation dialog for deletion */}
        <Typography variant="h4" gutterBottom>
          {process.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {process.content}
        </Typography>
      </MainCard>

      {/* Snackbar notification for success or error messages */}
      {/* <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
    </Fragment>
  );
};

export default ProcessContent;
