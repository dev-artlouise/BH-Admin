import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import { Grid, Stack, Snackbar, Alert, FormHelperText } from '@mui/material';
import MUITextField from 'components/common/MUITextField';
import MUIButton from 'components/common/MUIButton';
import useHeroHook from 'hooks/HeroHook';
import { CloudUploadOutlined } from '@ant-design/icons';
import useFileHandler from 'utils/useFileHandler';
import { useCustomMutation } from 'services/customMutation';
import { companyStyles } from 'styles/companyStyles';
import { blueGrey } from '@mui/material/colors';

const HeroForm = () => {
  // STATES
  const fileInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // HOOKS
  const { createContent, updateContent, initialValues, setInitialValues, validationSchema, isUpdateMode } = useHeroHook();
  const { handleFileChange } = useFileHandler(fileInputRef, initialValues.urlimage, setInitialValues, 'image');

  // FORMIK SETUP
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);

      if (values.image) formData.append('image', values.image);

      createMutation({ id: 1, formData }); // ID 1 is set by default
    },
    validateOnChange: true,
    enableReinitialize: true
  });

  const {
    mutate: createMutation,
    isLoading,
    isError
  } = useCustomMutation(
    ({ id, formData }) => (isUpdateMode ? updateContent(id, formData) : createContent(formData)),
    ['hero'],
    () => {
      setSnackbarMessage('Hero submitted successfully!');
      setSnackbarOpen(true);
    },
    (error) => {
      console.log('Error occured', error);
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
                placeholder="Enter Title"
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

          <Grid item xs={12}>
            <Stack spacing={1}>
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
                {formik.touched.image && formik.errors.image && <div style={{ color: 'red' }}>{formik.errors.image}</div>}
              </FormHelperText>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <MUIButton type="submit" variant="contained" color="primary" label="Submit" isLoading={isLoading} />
          </Grid>
        </Grid>
      </form>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HeroForm;
