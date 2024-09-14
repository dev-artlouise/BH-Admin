import { useState, useRef } from 'react';

import { useFormik } from 'formik';

import { Grid, Stack, Snackbar, Alert, FormHelperText } from '@mui/material';
import MUITextField from 'components/common/MUITextField';
import MUIButton from 'components/common/MUIButton';
import { useCustomMutation } from 'services/customMutation';
import { companyStyles } from 'styles/companyStyles';
import { CloudUploadOutlined, RestoreOutlined } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';

const validationSchema = Yup.object({
  name: Yup.string().required('Company name is required'),
  urlimage: Yup.mixed()
    .required('Image file is required') // Check if image file is not null
    .test('fileSize', 'The file is too large', (value) => {
      return value && value.size <= 2048 * 1024; // Max is 2MB in bytes [can be adjusted in the server]
    })
    .test('fileFormat', 'Unsupported File Format', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/svg+xml'].includes(value.type); // Validate file type || only JPEG and PNG files are supported
    })
});
import useCompanyHook from 'hooks/CompanyHook';
import { ClearOutlined } from '@ant-design/icons';

const CompanyForm = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Hooks
  const { createCompany, initialValues, setInitialValues, resetInitialValues, validationSchema } = useCompanyHook();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema, // Validate inputs with Yum
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name); // Append the text field 'name'
      formData.append('urlimage', file); // Append the file field 'urlimage'

      // Now trigger the mutation
      createCompanyMutation(formData);
    },
    validateOnChange: true
  });

  const onSuccess = () => {
    setSnackbarMessage('Company submitted successfully!');
    setSnackbarOpen(true);
    formik.resetForm(); // Reset the form after submission
    resetInitialValues();
    setFile(null); // Reset the file state

    console.log(initialValues);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
    }
  };

  const onError = (error) => {
    let message = ''; // To store message value

    switch (error.status) {
      case 404: // To handle Unprocessable Content
        message = 'Something went wrong. Please contact developer.';
        break;

      default:
        message = error.response.data.message || 'An error occurred';
    }

    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // Use the custom mutation hook
  const {
    mutate: createCompanyMutation,
    isLoading,
    isError
  } = useCustomMutation(
    createCompany, // API request
    ['companies'], // Query key to invalidate
    onSuccess, // Function to trigger for successful request
    onError
  );

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.currentTarget.files[0];
    setFile(selectedFile); // Update the state with the selected file
    formik.setFieldValue('urlimage', selectedFile); // Set Formik field value for validation
  };

  // Handle inputs
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    formik.setFieldValue(name, value); // Set Formik field value for validation
    setInitialValues(name, value);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
              value={initialValues.name}
              onChange={handleChangeInput}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          {initialValues.id && <img src={initialValues.urlimage} alt="img" width={'auto'} height={200} />}

          {/* UPDATE */}
          <Stack spacing={1}>
            <div
              style={{
                ...companyStyles.inputWrapper,
                border: formik.errors.urlimage && formik.touched.urlimage ? '1px solid red' : '1px solid lightgrey'
              }}
            >
              <input
                type="file"
                name="urlimage" // Ensure correct field name
                ref={fileInputRef}
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                accept="image/*" // Accept SVG and other image types
                style={{ width: '100%' }}
              />
              <CloudUploadOutlined style={{ fontSize: 20, color: blueGrey[700] }} />
            </div>

            {/* Error display for file upload */}
            <FormHelperText>
              {formik.touched.urlimage && formik.errors.urlimage ? <div style={{ color: 'red' }}>{formik.errors.urlimage}</div> : null}
            </FormHelperText>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <MUIButton size={'large'} type={'submit'} variant={'contained'} color={'primary'} label={'Submit'} isLoading={isLoading} />{' '}
          {/* <MUIButton size={'large'} variant={'outlined'} color={'warning'} label={'Reset form'} endIcon={<RestoreOutlined />} /> */}
        </Grid>
      </Grid>

      {JSON.stringify(initialValues)}
      {/* Snackbar Notification */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default CompanyForm;
