import { useState } from "react";

import { Typography, Grid, Skeleton, Button, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

import { useQuery, useMutation, useQueryClient } from "react-query";

import MainCard from "components/MainCard";
import MUIImageCard from "components/common/MuiImageCard";

import { getCompanies, deleteCompany } from "services/companiesServices";

const CompanyContent = () => {

    const queryClient = useQueryClient();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const { data: companies, isLoading, error } = useQuery('companies', getCompanies);

    const companiesData = companies

    // Define the delete mutation
    const deleteMutation = useMutation(deleteCompany, {
        onSuccess: () => {
            setSnackbarMessage('Company deleted successfully!');
            setSnackbarOpen(true);
            queryClient.invalidateQueries('companies'); // Invalidate the companies query to refetch data
            setDialogOpen(false); // Close the dialog on successful deletion
        },
        onError: () => {
            setSnackbarMessage('Error deleting company.');
            setSnackbarOpen(true);
            setDialogOpen(false); // Close the dialog on error
        },
    });

    const handleDelete = (companyId) => {
        console.log(companyId)
        setSelectedCompanyId(companyId); // Set the selected company ID
        setDialogOpen(true); // Open the dialog

    };

    const handleConfirmDelete = () => {
        deleteMutation.mutate(selectedCompanyId); // Trigger delete mutation
    };

    const handleCancelDelete = () => {
        setDialogOpen(false); // Close the dialog
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <MainCard
            Title="Current Company Section"
        >
            <Typography
                variant='h4'
                gutterBottom
            >
                Current Companies
            </Typography>

            <Grid
                container
                spacing={3}
            >
                {/* loop the company images here with companies api */}

                {isLoading ? (
                    Array.from({ length: companiesData?.length || 3 }).map((_, index) => (
                        <Grid item xs={4} key={index}>
                            <Skeleton
                                variant="rectangular"
                                height={140}
                            />
                            <MainCard>
                                <Skeleton width="100%" />
                            </MainCard>
                        </Grid>
                    ))
                ) : (
                    companiesData && companiesData.length > 0 ? (
                        companiesData.map(({ id, name, urlimage }) => (
                            <Grid item xs={4} key={id}>
                                <MUIImageCard
                                    imageSrc={urlimage ? urlimage : 'https://via.placeholder.com/150'}
                                    title={name}
                                    onDelete={() => handleDelete(id)}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                align="center"
                                mt={10}
                                mb={10}
                            >
                                No data available
                            </Typography>
                        </Grid>
                    )
                )}
            </Grid>

            {/* Snackbar Notification */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={deleteMutation.isError ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Dialog open={dialogOpen} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Deletion on </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this company?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </MainCard>
    )
}

export default CompanyContent