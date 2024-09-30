import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Grid, Stack, Snackbar, Alert, FormHelperText, FormLabel } from '@mui/material';
import MUITextField from 'components/common/MUITextField';
import MUIButton from 'components/common/MUIButton';
import { useCustomMutation } from 'services/customMutation';
import { companyStyles } from 'styles/companyStyles';
import { CloudUploadOutlined } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import useCompanyHook from 'hooks/CompanyHook';
import useFileHandler from 'utils/useFileHandler';
import { CloseOutlined } from '@ant-design/icons';

const CompanyForm = () => {
  const fileInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const { createList, updateList, initialValues, setUpdateMode, isUpdateMode, setInitialValues, resetInitialValues, validationSchema } =
    useCompanyHook();
  const { handleFileChange, clearFile } = useFileHandler(fileInputRef, initialValues.urlimage, setInitialValues, 'urlimage');

  // FORMIK SETUP
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);

      // Only append the urlimage if values.urlimage is assigned
      if (values.urlimage) formData.append('urlimage', values.urlimage);

      // Call createMutation or updateList directly here
      createMutation({ id: isUpdateMode ? initialValues.id : undefined, formData });
    },
    validateOnChange: true,
    enableReinitialize: true
  });

  const {
    mutate: createMutation,
    isLoading,
    isError
  } = useCustomMutation(
    ({ id, formData }) => (isUpdateMode ? updateList(id, formData) : createList(formData)),
    ['companies'],
    () => {
      setSnackbarMessage('Company submitted successfully!');
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
              label="Company Name"
              name="name"
              placeholder="Enter Company Name"
              value={formik.values.name}
              onChange={handleChangeInput}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <FormLabel>Upload new image</FormLabel>
            <div
              style={{
                ...companyStyles.inputWrapper,
                border: formik.touched.urlimage && formik.errors.urlimage ? '1px solid red' : '1px solid lightgrey'
              }}
            >
              <input
                type="file"
                name="urlimage"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e)}
                onBlur={formik.handleBlur}
                accept="image/*"
                style={{ width: '100%' }}
              />
              <CloudUploadOutlined style={{ fontSize: 20, color: blueGrey[700] }} />
            </div>
            <FormHelperText>
              {formik.touched.urlimage && formik.errors.urlimage && <div style={{ color: 'red' }}>{formik.errors.urlimage}</div>}
            </FormHelperText>
          </Stack>
        </Grid>

        <Grid item xs={12} gap={2}>
          <MUIButton type="submit" variant="contained" color="primary" label="Submit" isLoading={isLoading} />
          {isUpdateMode && <MUIButton color="error" label="Cancel" endIcon={<CloseOutlined />} onClick={handleCancelEdit} />}
        </Grid>
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default CompanyForm;
