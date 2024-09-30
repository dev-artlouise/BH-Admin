import { useFormik } from 'formik';
import { Grid, Stack, Snackbar, Alert } from '@mui/material';
import MUITextField from 'components/common/MUITextField';
import useServiceHook from 'hooks/ServiceHook';
import { useState } from 'react';
import { useCustomMutation } from 'services/customMutation';
import MUIButton from 'components/common/MUIButton';

const ServicesForm = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const { createContent, initialValues, setInitialValues, validationSchema } = useServiceHook();

  // FORMIK SETUP
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values.serviceTitle);
      formData.append('content', values.serviceContent);

      serviceMutation(formData);
    },
    validateOnChange: true,
    enableReinitialize: true
  });

  const {
    mutate: serviceMutation,
    isLoading: isLoadingSubmit,
    isError
  } = useCustomMutation(
    createContent,
    ['service'],
    () => {
      setSnackbarMessage('Service submitted successfully!');
      setSnackbarOpen(true);
    },
    (error) => {
      const message =
        error.status === 404 ? 'Something went wrong. Please contact developer.' : error.response.data.message || 'An error occurred';
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }
  );

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInitialValues(name, value);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Stack spacing={1}>
            <MUITextField
              label="Title"
              name="serviceTitle"
              placeholder="Enter Title"
              value={formik.values.serviceTitle}
              onChange={handleChangeInput}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.serviceTitle && Boolean(formik.errors.serviceTitle)}
              helperText={formik.touched.serviceTitle && formik.errors.serviceTitle}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <MUITextField
              label="Content"
              name="serviceContent"
              placeholder="Enter Content"
              value={formik.values.serviceContent}
              onChange={handleChangeInput}
              onBlur={formik.handleBlur}
              fullWidth
              multiline
              rows={4}
              error={formik.touched.serviceContent && Boolean(formik.errors.serviceContent)}
              helperText={formik.touched.serviceContent && formik.errors.serviceContent}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} gap={2}>
          <MUIButton type="submit" variant="contained" color="primary" label="Submit" isLoading={isLoadingSubmit} />
        </Grid>

        {/* Snackbar notification for success or error messages */}
        <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </form>
  );
};

export default ServicesForm;