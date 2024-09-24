import { Fragment, useState } from 'react';
import {
  Typography,
  Grid,
  Skeleton,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import MainCard from 'components/MainCard';
import { useQuery } from 'react-query';
import { deleteCompany } from 'services/companiesServices';
import { useCustomMutation } from 'services/customMutation';
import { LoadingButton } from '@mui/lab';

import useCompanyHook from 'hooks/CompanyHook';
import MUICard from 'components/common/MUICard';

const CompanyContent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Hook for managing company data and state
  const { getCompanies, getCompany, resetInitialValues } = useCompanyHook();

  // Query to fetch the list of companies
  const { data: companies = [], isLoading } = useQuery('companies', getCompanies, { refetchOnWindowFocus: false });

  // Mutation hook for deleting a company
  const {
    mutate: deleteCompanyMutation,
    isLoading: isLoadingDelete,
    isError
  } = useCustomMutation(
    deleteCompany, // API request
    ['companies'], // Query key to invalidate
    () => {
      setSnackbarMessage('Company deleted successfully!');
      setSnackbarOpen(true);
      resetInitialValues(); // Reset form values after successful deletion
      setDialogOpen(false); // Close the confirmation dialog
    },
    () => {
      setSnackbarMessage('Failed to delete company.');
      setSnackbarOpen(true);
      setDialogOpen(false); // Close the confirmation dialog on error
    }
  );

  // Open the confirmation dialog for deletion
  const handleDelete = (companyId) => {
    setSelectedCompanyId(companyId); // Set the ID of the company to delete
    setDialogOpen(true); // Show the confirmation dialog
  };

  // Confirm deletion and trigger the mutation
  const handleConfirmDelete = () => {
    deleteCompanyMutation(selectedCompanyId); // Execute delete mutation
  };

  // Cancel deletion and close the dialog
  const handleCancelDelete = () => {
    setDialogOpen(false); // Hide the dialog
  };

  // Close the snackbar notification
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Handle click to edit a company
  const handleEdit = (id) => {
    getCompany(id);
  };

  return (
    <Fragment>
      <MainCard title="Current Company Section" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
        <Grid container spacing={3}>
          {/* Display skeleton loaders while data is loading */}
          {isLoading ? (
            Array.from({ length: companies?.length || 3 }).map((_, index) => (
              <Grid item xs={4} key={index}>
                <Skeleton variant="rectangular" height={140} />
                <MainCard>
                  <Skeleton width="100%" />
                </MainCard>
              </Grid>
            ))
          ) : companies.length > 0 ? (
            companies.map(({ id, name, urlimage }, key) => (
              <Grid item xs={4} key={key}>
                <MUICard title={name} url={urlimage} onDelete={() => handleDelete(id)} onEdit={() => handleEdit(id)} />
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
      </MainCard>

      {/* Confirmation dialog for deletion */}
      <Dialog open={dialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this company?</DialogContentText>
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
    </Fragment>
  );
};

export default CompanyContent;
