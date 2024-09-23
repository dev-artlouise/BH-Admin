import { useState } from 'react';
import { useFormik } from 'formik';

import { Grid, Stack, Snackbar, Alert } from '@mui/material';

import MUITextField from 'components/common/MUITextField';
import useReputationHook from 'hooks/ReputationHook';
import { useCustomMutation } from 'services/customMutation';
import MUIButton from 'components/common/MUIButton';
import { SaveFilled } from '@ant-design/icons';

const Form = () => {
  // STATES
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const { createReputation, initialValues, setInitialValues, validationSchema } = useReputationHook();

  // FORMIK SETUP
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append('year_in_business', values.year_in_business);
      formData.append('project_delivered', values.project_delivered);
      formData.append('satisfied_customer', values.satisfied_customer);

      reputationMutation(formData);
    },
    validateOnChange: true,
    enableReinitialize: true
  });

  const {
    mutate: reputationMutation,
    isLoading,
    isError
  } = useCustomMutation(
    createReputation,
    ['reputations'],
    () => {
      setSnackbarMessage('Reputation updated successfully!');
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
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <Stack spacing={1}>
              <MUITextField
                label="Years in Business"
                name="year_in_business"
                placeholder="Years in Business"
                value={formik.values.year_in_business}
                onChange={handleChangeInput}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.year_in_business && Boolean(formik.errors.year_in_business)}
                helperText={formik.touched.year_in_business && formik.errors.year_in_business}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <MUITextField
                label="Project Delivered"
                name="project_delivered"
                placeholder="Project Delivered"
                value={formik.values.project_delivered}
                onChange={handleChangeInput}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.project_delivered && Boolean(formik.errors.project_delivered)}
                helperText={formik.touched.project_delivered && formik.errors.project_delivered}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <MUITextField
                label="Satisfied Customer (%)"
                name="satisfied_customer"
                placeholder="Satisfied Customer (%)"
                value={formik.values.satisfied_customer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.satisfied_customer && Boolean(formik.errors.satisfied_customer)}
                helperText={formik.touched.satisfied_customer && formik.errors.satisfied_customer}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <MUIButton
              type="submit"
              variant="contained"
              color="primary"
              label="Save changes"
              isLoading={isLoading}
              endIcon={<SaveFilled />}
            />
          </Grid>
        </Grid>
      </form>

      {/* SNACKBAR */}
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Form;
