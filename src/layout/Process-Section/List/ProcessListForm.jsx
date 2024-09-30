import { useFormik } from 'formik';
import { Grid, Stack, FormHelperText, FormLabel, Snackbar, Alert } from '@mui/material';
import MUITextField from 'components/common/MUITextField';
import { CloseOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { companyStyles } from 'styles/companyStyles';
import useFileHandler from 'utils/useFileHandler';
import { useRef, useState } from 'react';
import { useCustomMutation } from 'services/customMutation';
import { blueGrey } from '@mui/material/colors';
import MUIButton from 'components/common/MUIButton';
import useProcessHook from 'hooks/ProcessHook';

const ProcessListForm = () => {
  const fileInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const {
    createList,
    updateList,
    initialValuesList,
    setUpdateMode,
    isUpdateMode,
    setInitialValuesList,
    resetInitialValuesList,
    validationSchemaList
  } = useProcessHook();
  const { handleFileChange, clearFile } = useFileHandler(fileInputRef, initialValuesList.logo_url, setInitialValuesList, 'logo_url');

  // FORMIK SETUP
  const formik = useFormik({
    initialValues: initialValuesList,
    validationSchema: validationSchemaList,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values?.title);
      formData.append('content', values?.content);

      if (values.logo_url) formData.append('logo_url', values?.logo_url);
      createMutation({ id: isUpdateMode ? initialValuesList.id : undefined, formData });
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
    ['processes'],
    () => {
      setSnackbarMessage('Process submitted successfully!');
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
    setInitialValuesList(name, value);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleCancelEdit = () => {
    handleClearForm();
    setUpdateMode(false);
  };

  const handleClearForm = () => {
    resetInitialValuesList();
    clearFile();
  };

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
                name="logo_url"
                ref={fileInputRef}
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                accept="image/*"
                style={{ width: '100%' }}
              />
              <CloudUploadOutlined style={{ fontSize: 20, color: blueGrey[700] }} />
            </div>
            <FormHelperText>
              {formik.touched.logo_url && formik.errors.logo_url && <div style={{ color: 'red' }}>{formik.errors.logo_url}</div>}
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

export default ProcessListForm;
