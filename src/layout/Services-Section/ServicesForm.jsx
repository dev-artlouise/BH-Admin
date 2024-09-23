import { useFormik } from 'formik';

import { Grid, Stack, FormHelperText, FormLabel, Snackbar, Alert } from '@mui/material';

import MUITextField from 'components/common/MUITextField';
import { CloseOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { companyStyles } from 'styles/companyStyles';
import useFileHandler from 'utils/useFileHandler';
import useServiceHook from 'hooks/ServiceHook';
import { useRef, useState } from 'react';
import { useCustomMutation } from 'services/customMutation';
import { blueGrey } from '@mui/material/colors';
import MUIButton from 'components/common/MUIButton';

const ServicesForm = () => {
  const fileInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const { createService, initialValues, setUpdateMode, isUpdateMode, setInitialValues, resetInitialValues, validationSchema } =
    useServiceHook();
  const { handleFileChange, clearFile } = useFileHandler(fileInputRef, initialValues.serviceLogo, setInitialValues, 'serviceLogo');

  // FORMIK SETUP
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('hey');
      const formData = new FormData();
      formData.append('title', values.serviceTitle);
      formData.append('content', values.serviceContent);
      formData.append('logo_url', values.serviceLogo);

      serviceMutation(formData);
    },
    validateOnChange: true,
    enableReinitialize: true
  });

  const {
    mutate: serviceMutation,
    isLoading,
    isError
  } = useCustomMutation(
    createService,
    ['services'],
    () => {
      setSnackbarMessage('Service submitted successfully!');
      setSnackbarOpen(true);
      handleClearForm();
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

  const handleCancelEdit = () => {
    handleClearForm();
    setUpdateMode(false);
  };

  const handleClearForm = () => {
    clearFile();
    resetInitialValues();
  };

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
          <Stack spacing={1} mt={2}>
            <FormLabel>Upload the logo</FormLabel>
            <div
              style={{
                ...companyStyles.inputWrapper,
                border: formik.touched.logo_url && formik.errors.logo_url ? '1px solid red' : '1px solid lightgrey'
              }}
            >
              <input
                type="file"
                name="serviceLogo"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e)}
                onBlur={formik.handleBlur}
                accept="image/*"
                style={{ width: '100%' }}
              />
              <CloudUploadOutlined style={{ fontSize: 20, color: blueGrey[700] }} />
            </div>
            <FormHelperText>
              {formik.touched.serviceLogo && formik.errors.serviceLogo && <div style={{ color: 'red' }}>{formik.errors.serviceLogo}</div>}
            </FormHelperText>
          </Stack>
        </Grid>

        <Grid item xs={12} gap={2}>
          <MUIButton type="submit" variant="contained" color="primary" label="Submit" isLoading={isLoading} />
          {isUpdateMode && <MUIButton color="error" label="Cancel" endIcon={<CloseOutlined />} onClick={handleCancelEdit} />}
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
