import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Grid, Stack, Button, Snackbar, Alert } from '@mui/material'

import MUITextField from 'components/common/MUITextField'

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    tagline: Yup.string(),
    description: Yup.string(),
});

const Form = () => {

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            tagline: '',
            description: '',
        },
        validationSchema: validationSchema,

        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('tagline', values.tagline);
            formData.append('description', values.description);

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
                console.log('Form data submitted:', formData);
                resetForm(); // Reset form fields
                setOpenSnackbar(true); // Show success Snackbar
            }, 500);

        },

    });

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
                                label='Tagline'
                                name='tagline'
                                placeholder='Enter tagline'
                                value={formik.values.tagline}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                multiline
                                rows={4}
                                error={formik.touched.tagline && Boolean(formik.errors.tagline)}
                                helperText={formik.touched.tagline && formik.errors.tagline}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <MUITextField
                                label='Description'
                                name='description'
                                placeholder='Enter Description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                multiline
                                rows={4}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            disableElevation
                            // disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form >
        </>
    )
}

export default Form
