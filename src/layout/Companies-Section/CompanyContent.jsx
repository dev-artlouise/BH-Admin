import { useEffect, useState } from 'react';

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

import { useQuery } from 'react-query';

import MainCard from 'components/MainCard';

import { getCompanies, deleteCompany } from 'services/companiesServices';
import CompanyCardComponent from 'components/cards/company/CompanyCardComponent';
import { useCustomMutation } from 'services/customMutation';
import { LoadingButton } from '@mui/lab';

const CompanyContent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // const { data: companies, isLoading } = useQuery('companies', getCompanies);

  const { data: companies = [], isLoading } = useQuery('companies', getCompanies);

  // Define the delete mutation

  const onSuccess = () => {
    setSnackbarMessage('Company deleted successfully!');
    setSnackbarOpen(true);

    setDialogOpen(false); // Close the dialog on successful deletion
  };

  const onError = () => {
    setSnackbarMessage('Failed to delete company.');
    setSnackbarOpen(true);
    setDialogOpen(false); // Close the dialog on error
  };

  // Use the custom mutation hook
  const {
    mutate: deleteCompanyMutation,
    isLoading: isLoadingDelete,
    isError
  } = useCustomMutation(
    deleteCompany, // API request
    ['companies'], // Query key to invalidate
    onSuccess, // Function to trigger for successful request
    onError
  );

  const handleDelete = (companyId) => {
    setSelectedCompanyId(companyId); // Set the selected company ID
    setDialogOpen(true); // Open the dialog
  };

  const handleConfirmDelete = () => {
    deleteCompanyMutation(selectedCompanyId); // Trigger delete mutation
  };

  const handleCancelDelete = () => {
    setDialogOpen(false); // Close the dialog
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    console.log(companies);
  }, []);
  return (
    <MainCard title="Current Company Section" darkTitle contentSX={{ maxHeight: 450, overflowY: 'auto' }}>
      <Grid container spacing={3}>
        {/* loop the company images here with companies api */}

        {isLoading ? (
          Array.from({ length: companies?.length || 3 }).map((_, index) => (
            <Grid item xs={4} key={index}>
              <Skeleton variant="rectangular" height={140} />
              <MainCard>
                <Skeleton width="100%" />
              </MainCard>
            </Grid>
          ))
        ) : companies && companies?.length > 0 ? (
          companies?.map(({ id, name, urlimage }, key) => (
            <Grid item xs={4} key={key} spacing={2}>
              {/* <MUIImageCard
                imageSrc={urlimage ? urlimage : 'https://via.placeholder.com/150'}
                title={name}
                onDelete={() => handleDelete(id)}
              /> */}

              <CompanyCardComponent title={name} url={urlimage} onDelete={() => handleDelete(id)} onEdit={() => handleDelete(id)} />
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

      {/* Snackbar Notification */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion on </DialogTitle>
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
    </MainCard>
  );
};

export default CompanyContent;
