import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Stack, Button, Snackbar, Alert, FormHelperText } from '@mui/material'
import { createHero } from 'services/heroServices';
import { useCustomMutation } from 'services/customMutation';
import { companyStyles } from 'styles/companyStyles';
import { CloudUploadOutlined } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';

import MUITextField from 'components/common/MUITextField'
import MUIButton from 'components/common/MUIButton';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    image: Yup.mixed()
        .required('Image file is required') // Check if image file is not null
        .test('fileSize', 'The file is too large', (value) => {
            return value && value.size <= 2048 * 1024; // Max is 2MB in bytes [can be adjusted in the server]
        })
        .test('fileFormat', 'Unsupported File Format', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/svg+xml'].includes(value.type); // Validate file type || only JPEG and PNG files are supported
        }),
    content: Yup.string().required('Content is required'),
});

const HeroForm = () => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            image: null,
        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('image', file)
            createHeroMutation(formData);
        }
    });

    const onSuccess = () => {
        setSnackbarMessage('Hero Content submitted successfully!');
        setSnackbarOpen(true);
        formik.resetForm(); // Reset the form after submission
        setFile(null); // Reset the file state

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
        mutate: createHeroMutation,
        isLoading,
        isError
    } = useCustomMutation(
        createHero, // API request
        ['hero'], // Query key to invalidate
        onSuccess, // Function to trigger for successful request
        onError
    );

    // Handle file change
    const handleFileChange = (event) => {
        const selectedFile = event.currentTarget.files[0];
        setFile(selectedFile); // Update the state with the selected file
        formik.setFieldValue('image', selectedFile); // Set Formik field value for validation
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (

        <form onSubmit={formik.handleSubmit}>
            <Grid
                container
                spacing={3}
                direction='column'
            >
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <MUITextField
                            label='Title'
                            name='title'
                            placeholder='Enter Title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
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
                            label='Content'
                            name='content'
                            placeholder='Enter Title'
                            value={formik.values.content}
                            onChange={formik.handleChange}
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
                        {/* <MUITextField
                            label="Upload Hero Image"
                            name="heroImage"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            inputProps={{ accept: 'image/*' }}
                        /> */}

                        <div
                            style={{
                                ...companyStyles.inputWrapper,
                                border: formik.errors.image && formik.touched.image ? '1px solid red' : '1px solid lightgrey'
                            }}
                        >
                            <input
                                type="file"
                                name="image"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                onBlur={formik.handleBlur}
                                accept="image/*"
                                style={{ width: '100%' }}
                            />
                            <CloudUploadOutlined style={{ fontSize: 20, color: blueGrey[700] }} />
                        </div>

                        <FormHelperText>
                            {formik.touched.image && formik.errors.image ? <div style={{ color: 'red' }}>{formik.errors.image}</div> : null}
                        </FormHelperText>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <MUIButton size={'large'} type={'submit'} variant={'contained'} color={'primary'} label={'Submit'} isLoading={isLoading} />
                </Grid>
            </Grid>

            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form >

    )
}

export default HeroForm
