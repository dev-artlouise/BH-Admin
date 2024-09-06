import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';

import { Grid, Stack, InputLabel, OutlinedInput, Button, Snackbar, Alert } from '@mui/material'

import MUITextField from 'components/common/MUITextField';
import MUIButton from 'components/common/MUIButton';

import { createCompany, deleteCompany } from 'services/companiesServices';

const validationSchema = Yup.object({
    name: Yup.string().required('Company Name is required'),
});

const styles = {
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        padding: '12px',
        backgroundColor: '#fff',
    },
    fileInput: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
    },
    label: {
        flex: 1,
        padding: '6px 12px',
        cursor: 'pointer',
        color: '#495057',
        fontSize: '0.875rem',
        lineHeight: '1.5',
    },
};

const CompanyForm = () => {

    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            // urlimage: '',
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            console.log(values)
            const formData = new FormData();
            formData.append('name', values.name); // Append the text field 'name'
            formData.append('urlimage', file); // Append the file field 'urlimage'

            // Now trigger the mutation
            mutation.mutate(formData);
        }
    })

    // Handle file change
    const handleFileChange = (event) => {
        const selectedFile = event.currentTarget.files[0];
        setFile(selectedFile); // Update the state with the selected file
        formik.setFieldValue('companyImage ', selectedFile); // Set Formik field value for validation
    }

    // Define the mutation
    const mutation = useMutation(createCompany, {
        onSuccess: () => {
            setSnackbarMessage('Company submitted successfully!');
            setSnackbarOpen(true);
            formik.resetForm(); // Reset the form after submission
        },
        onError: () => {
            setSnackbarMessage('Error submitting company.');
            setSnackbarOpen(true);
        },
    });

    // Function to handle delete button click
    const handleDeleteClick = (companyId) => {
        setSelectedCompanyId(companyId); // Set the selected company ID
        setDialogOpen(true); // Open the dialog
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid
                container
                spacing={3}
                direction='column'
            >
                <Grid
                    item
                    xs={12}
                >
                    <Stack spacing={1}>

                        <MUITextField
                            label='Company Name'
                            name='name'
                            placeholder='Enter Company Name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Stack>

                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <div style={styles.inputWrapper}>
                            <input
                                type="file"
                                name="companyImage "
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                onBlur={formik.handleBlur}
                                accept="image/*"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <MUIButton
                        size={'large'}
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        label={'Submit'}
                    />
                </Grid>
            </Grid>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={mutation.isError ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    )
}

export default CompanyForm
