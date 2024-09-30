import { useFormik } from 'formik';
import { Grid, Stack, FormHelperText, FormLabel, Snackbar, Alert } from '@mui/material';
import MUITextField from 'components/common/MUITextField';
import { CloseOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { companyStyles } from 'styles/companyStyles';
import useFileHandler from 'utils/useFileHandler';
import { useRef, useState } from 'react';
import { useCustomMutation } from 'services/customMutation';
import { blueGrey } from '@mui/material/colors';
import useOurTeamHook from 'hooks/OurTeamHook';
import MUIButton from 'components/common/MUIButton';

const Form = () => {
  const fileInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const { createList, updateList, initialValues, setUpdateMode, isUpdateMode, setInitialValues, resetInitialValues, validationSchema } =
    useOurTeamHook();
  const { handleFileChange, clearFile } = useFileHandler(fileInputRef, initialValues.avatar, setInitialValues, 'avatar');

  // FORMIK SETUP
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('fullname', values?.fullname);
      formData.append('position', values?.position);
      formData.append('message', values?.message);

      if (values.avatar) formData.append('avatar', values?.avatar);

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
    ['ourTeam'],
    () => {
      setSnackbarMessage('Record submitted successfully!');
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
    resetInitialValues();
    clearFile();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <MUITextField
                label="Full Name"
                name="fullname"
                placeholder="Enter full name"
                value={formik.values.fullname}
                onChange={handleChangeInput}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                helperText={formik.touched.fullname && formik.errors.fullname}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <MUITextField
                label="Position"
                name="position"
                placeholder="Enter position"
                value={formik.values.position}
                onChange={handleChangeInput}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.position && Boolean(formik.errors.position)}
                helperText={formik.touched.position && formik.errors.position}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <MUITextField
            label="Message"
            name="message"
            multiline
            rows={4}
            placeholder="Enter message"
            value={formik.values.message}
            onChange={handleChangeInput}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <FormLabel>Upload avatar</FormLabel>
            <div
              style={{
                ...companyStyles.inputWrapper,
                border: formik.touched.avatar && formik.errors.avatar ? '1px solid red' : '1px solid lightgrey'
              }}
            >
              <input
                type="file"
                name="avatar"
                ref={fileInputRef}
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                accept="image/*"
                style={{ width: '100%' }}
              />
              <CloudUploadOutlined style={{ fontSize: 20, color: blueGrey[700] }} />
            </div>
            <FormHelperText>
              {formik.touched.avatar && formik.errors.avatar && <div style={{ color: 'red' }}>{formik.errors.avatar}</div>}
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

export default Form;
