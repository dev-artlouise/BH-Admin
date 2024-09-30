import { useFormik } from 'formik';
import { Grid, Stack, Snackbar, Alert } from '@mui/material';
import MUITextField from 'components/common/MUITextField';
import { useState } from 'react';
import { useCustomMutation } from 'services/customMutation';
import MUIButton from 'components/common/MUIButton';
import useTestimonialsHook from 'hooks/TestimonialsHook';

const Form = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const { createContent, initialValues, setInitialValues, validationSchema } = useTestimonialsHook();

  // FORMIK SETUP
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);

      mutation(formData);
    },
    validateOnChange: true,
    enableReinitialize: true
  });

  const {
    mutate: mutation,
    isLoading: isLoadingSubmit,
    isError
  } = useCustomMutation(
    createContent,
    ['testimonial'],
    () => {
      setSnackbarMessage('Record submitted successfully!');
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
              name="title"
              placeholder="Enter Title"
              value={formik.values.title}
              onChange={handleChangeInput}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <MUITextField
              label="Content"
              name="content"
              placeholder="Enter Content"
              value={formik.values.content}
              onChange={handleChangeInput}
              onBlur={formik.handleBlur}
              fullWidth
              multiline
              rows={4}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
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

export default Form;
