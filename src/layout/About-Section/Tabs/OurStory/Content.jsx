import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import useOurStoryHook from 'hooks/OutStoryHook';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

const Content = () => {
  // Hook for managing company data and state
  const { getContent } = useOurStoryHook();

  // Query to fetch the list
  const { data: { data: ourStory = {} } = [] } = useQuery('ourStory', getContent, { refetchOnWindowFocus: false });

  return (
    <Fragment>
      <MainCard title="Our Story Preview" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
        {/* Confirmation dialog for deletion */}
        <Typography variant="h4" gutterBottom>
          {ourStory.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {ourStory.content}
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
