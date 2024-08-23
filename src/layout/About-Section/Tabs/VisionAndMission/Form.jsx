import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Grid, Stack, Button, Snackbar, Alert } from '@mui/material'

import MUITextField from 'components/common/MUITextField'

const validationSchema = Yup.object({
    vision: Yup.string(),
    mission: Yup.string(),
});

const Form = () => {

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const formik = useFormik({
        initialValues: {
            vision: '',
            mission: '',
        },
        validationSchema: validationSchema,

        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('vision', values.vision);
            formData.append('mission', values.mission);

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
                                label='Vision'
                                name='vision'
                                placeholder='Enter Vision'
                                value={formik.values.vision}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                multiline
                                rows={4}
                                error={formik.touched.vision && Boolean(formik.errors.vision)}
                                helperText={formik.touched.vision && formik.errors.vision}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <MUITextField
                                label='Mission'
                                name='mission'
                                placeholder='Enter Mission'
                                value={formik.values.mission}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                multiline
                                rows={4}
                                error={formik.touched.mission && Boolean(formik.errors.mission)}
                                helperText={formik.touched.mission && formik.errors.mission}
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

export default Form
