import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import useProjectsHook from 'hooks/ProjectsHook';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

const Content = () => {
  // Hook for managing company data and state
  const { getContent } = useProjectsHook();

  // Query to fetch the list
  const { data: { data: project = {} } = [] } = useQuery('project', getContent, { refetchOnWindowFocus: false });

  return (
    <Fragment>
      <MainCard title=" Preview" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
        {/* Confirmation dialog for deletion */}
        <Typography variant="h4" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {project.content}
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
