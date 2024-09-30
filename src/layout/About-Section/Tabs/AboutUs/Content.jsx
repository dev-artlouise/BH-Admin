import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import useAboutUsHook from 'hooks/AboutUsHook';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

const Content = () => {
  // Hook for managing data and state
  const { getContent } = useAboutUsHook();

  // Query to fetch the list
  const { data: { data: whyUs = {} } = [] } = useQuery('aboutUs', getContent, { refetchOnWindowFocus: false });

  return (
    <Fragment>
      <MainCard title="About Us Preview" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
        {/* Confirmation dialog for deletion */}
        <Typography variant="h4" gutterBottom>
          {whyUs.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {whyUs.content}
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

export default Content;
