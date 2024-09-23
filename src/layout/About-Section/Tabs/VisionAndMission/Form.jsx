import { useState } from 'react';
import { useFormik } from 'formik';
import { Grid, Stack, Snackbar, Alert } from '@mui/material';
import MUITextField from 'components/common/MUITextField';
import { SaveFilled } from '@ant-design/icons';
import MUIButton from 'components/common/MUIButton';
import useMissionVisionHook from 'hooks/MissionVisionHook';
import { useCustomMutation } from 'services/customMutation';

const Form = () => {
  // STATES
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const { createMissionVision, initialValues, setInitialValues, validationSchema } = useMissionVisionHook();

  // FORMIK SETUP
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append('mission', values.mission);
      formData.append('vision', values.vision);

      missionVisionMutation(formData);
    },
    validateOnChange: true,
    enableReinitialize: true
  });

  const {
    mutate: missionVisionMutation,
    isLoading,
    isError
  } = useCustomMutation(
    createMissionVision,
    ['mission_vision'],
    () => {
      setSnackbarMessage('Mission and vision updated successfully!');
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
                label="Mission"
                name="mission"
                placeholder="Enter Mission"
                value={formik.values.mission}
                onChange={handleChangeInput}
                onBlur={formik.handleBlur}
                fullWidth
                multiline
                rows={6}
                error={formik.touched.mission && Boolean(formik.errors.mission)}
                helperText={formik.touched.mission && formik.errors.mission}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <MUITextField
                label="Vision"
                name="vision"
                placeholder="Enter Vision"
                value={formik.values.vision}
                onChange={handleChangeInput}
                onBlur={formik.handleBlur}
                fullWidth
                multiline
                rows={4}
                error={formik.touched.vision && Boolean(formik.errors.vision)}
                helperText={formik.touched.vision && formik.errors.vision}
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
