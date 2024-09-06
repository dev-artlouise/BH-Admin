import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Grid, Stack, Button, Snackbar, Alert } from '@mui/material'

import MUITextField from 'components/common/MUITextField'
import MUIButton from 'components/common/MUIButton';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
});

const styles = {
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        padding: '12px',
        backgroundColor: '#fff',
    },
    fileInput: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
    },
    label: {
        flex: 1,
        padding: '6px 12px',
        cursor: 'pointer',
        color: '#495057',
        fontSize: '0.875rem',
        lineHeight: '1.5',
    },
};

const HeroForm = () => {
    const [file, setFile] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const fileInputRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            heroImage: '',
        },
        validationSchema: validationSchema,

        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);
            if (file) {
                formData.append('heroImage', file);
            }

            // Log FormData contents
            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(`${key}: ${value.name}`); // For files, log file name
                } else {
                    console.log(`${key}: ${value}`); // For other values
                }
            }

            // Example: Send the formData to a server
            // fetch('/your-api-endpoint', {
            //   method: 'POST',
            //   body: formData,
            // });

            // Simulate form submission
            setTimeout(() => {
                console.log('File input ref:', fileInputRef.current);
                console.log('Form data submitted:', formData);
                resetForm(); // Reset form fields
                setFile(null); // Clear the file state
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Clear the file input value
                }
                setOpenSnackbar(true); // Show success Snackbar
            }, 500);

        },

    });

    // Handle file change
    const handleFileChange = (event) => {
        const selectedFile = event.currentTarget.files[0];
        setFile(selectedFile); // Update the state with the selected file
        formik.setFieldValue('heroImage', selectedFile); // Set Formik field value for validation
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
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

                            <div style={styles.inputWrapper}>
                                <input
                                    type="file"
                                    name="heroImage"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    onBlur={formik.handleBlur}
                                    accept="image/*"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <MUIButton
                            label='Submit'
                            size='large'
                            type='submit'
                            variant='contained'
                            color='primary'
                        />
                    </Grid>
                </Grid>
            </form >
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position Snackbar
                sx={{ width: 'auto' }} // Adjust width if needed
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ fontSize: '1rem', padding: '1rem' }} // Make Alert text larger
                >
                    Form submitted successfully!
                </Alert>
            </Snackbar>
        </>
    )
}

export default HeroForm
