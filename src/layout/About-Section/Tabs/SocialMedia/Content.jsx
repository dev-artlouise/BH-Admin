import {
  Typography,
  Grid,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import { useCustomMutation } from 'services/customMutation';
import { useQuery } from 'react-query';
import TeamCardComponent from 'components/cards/TeamCardComponent';
import { LoadingButton } from '@mui/lab';
import useSocMedHook from 'hooks/SocMedHook';

const Content = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Hook for managing  data and state
  const { getLists, getList, deleteList } = useSocMedHook();

  // Query to fetch the list
  const { data: { data: lists = [] } = [], isLoading: isLoadingFetch } = useQuery('socMeds', getLists, { refetchOnWindowFocus: false });

  // Mutation hook for deleting
  const {
    mutate: deleteMutation,
    isLoading: isLoadingDelete,
    isError
  } = useCustomMutation(
    deleteList, // API request
    ['socMeds'], // Query key to invalidate
    () => {
      setSnackbarMessage('Record deleted successfully!');
      setSnackbarOpen(true);
      setDialogOpen(false); // Close the confirmation dialog
    },
    () => {
      setSnackbarMessage('Failed to delete record.');
      setSnackbarOpen(true);
      setDialogOpen(false); // Close the confirmation dialog on error
    }
  );

  // Open the confirmation dialog for deletion
  const handleDelete = (id) => {
    setSelectedId(id); // Set the ID
    setDialogOpen(true); // Show the confirmation dialog
  };

  // Confirm deletion and trigger the mutation
  const handleConfirmDelete = () => {
    deleteMutation(selectedId); // Execute delete mutation
  };

  // Cancel deletion and close the dialog
  const handleCancelDelete = () => {
    setDialogOpen(false); // Hide the dialog
  };

  // Close the snackbar notification
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  // Handle click to edit
  const handleEdit = (id) => {
    getList(id);
  };
  return (
    <MainCard title="Social Medias" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
      <Grid container>
        <Grid container spacing={3}>
          {/* Display skeleton loaders while data is loading */}
          {isLoadingFetch ? (
            Array.from({ length: lists?.length || 3 }).map((_, index) => (
              <Grid item xs={4} key={index}>
                <Skeleton variant="rectangular" height={140} />
                <MainCard>
                  <Skeleton width="100%" />
                </MainCard>
              </Grid>
            ))
          ) : lists.length > 0 ? (
            lists.map(({ id, title, logo }, key) => (
              <Grid item sm={6} md={6} lg={6} xl={4} key={key}>
                <TeamCardComponent name={title} avatar={logo} onDelete={() => handleDelete(id)} onEdit={() => handleEdit(id)} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" mt={10} mb={10}>
                No data available
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Confirmation dialog for deletion */}
      <Dialog open={dialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this record?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <LoadingButton onClick={handleConfirmDelete} color="error" loading={isLoadingDelete} variant="contained">
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Snackbar notification for success or error messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default Content;
