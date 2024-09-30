import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import useServiceHook from 'hooks/ServiceHook';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

const ServicesContent = () => {
  // Hook for managing company data and state
  const { getContent } = useServiceHook();

  // Query to fetch the list of companies
  const { data: { data: service = {} } = [] } = useQuery('service', getContent, { refetchOnWindowFocus: false });

  return (
    <Fragment>
      <MainCard title="Service Content Preview" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
        {/* Confirmation dialog for deletion */}
        <Typography variant="h4" gutterBottom>
          {service.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {service.content}
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

export default ServicesContent;
