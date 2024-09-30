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
import useProjectsHook from 'hooks/ProjectsHook';

const ListForm = () => {
  const fileInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const {
    createList,
    updateList,
    initialValuesList: initialValues,
    setUpdateMode,
    isUpdateMode,
    setInitialValuesList,
    resetInitialValuesList,
    validationSchemaList
  } = useProjectsHook();
  const { handleFileChange, clearFile } = useFileHandler(fileInputRef, initialValues.avatar, setInitialValuesList, 'image_url');

  // FORMIK SETUP
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaList,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values?.title);
      formData.append('content', values?.content);
      if (values.image_url) formData.append('image_url', values?.image_url);

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
    ['projects'],
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
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <MUITextField
            label="Project title"
            name="title"
            placeholder="Enter project title"
            value={formik.values.title}
            onChange={handleChangeInput}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>

        <Grid item xs={12}>
          <MUITextField
            label="Content"
            name="content"
            multiline
            rows={4}
            placeholder="Write a content"
            value={formik.values.content}
            onChange={handleChangeInput}
            onBlur={formik.handleBlur}
            fullWidth
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <FormLabel>Upload image</FormLabel>
            <div
              style={{
                ...companyStyles.inputWrapper,
                border: formik.touched.image_url && formik.errors.image_url ? '1px solid red' : '1px solid lightgrey'
              }}
            >
              <input
                type="file"
                name="image_url"
                ref={fileInputRef}
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                accept="image/*"
                style={{ width: '100%' }}
              />
              <CloudUploadOutlined style={{ fontSize: 20, color: blueGrey[700] }} />
            </div>
            <FormHelperText>
              {formik.touched.image_url && formik.errors.image_url && <div style={{ color: 'red' }}>{formik.errors.image_url}</div>}
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

export default ListForm;
