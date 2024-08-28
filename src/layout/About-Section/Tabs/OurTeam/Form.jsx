import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Grid, Stack, InputLabel, OutlinedInput, Button } from '@mui/material'

import MUITextField from 'components/common/MUITextField';

const validationSchema = Yup.object({
    companyName: Yup.string().required('Company Name is required'),
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

const Form = () => {

    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            companyName: '',
            companyImage: '',
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            console.log(values)
        }
    })

    // Handle file change
    const handleFileChange = (event) => {
        const selectedFile = event.currentTarget.files[0];
        setFile(selectedFile); // Update the state with the selected file
        formik.setFieldValue('heroImage', selectedFile); // Set Formik field value for validation
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid
                container
                spacing={3}
                direction='column'
            >
                <Grid
                    item
                    xs={12}
                >
                    <Stack spacing={1}>
                        <MUITextField
                            label='Full Name'
                            name='companyName'
                            placeholder='Enter Company Name'
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                            helperText={formik.touched.companyName && formik.errors.companyName}
                        />
                    </Stack>

                    <Stack spacing={1}>
                        <MUITextField
                            label='Full Name'
                            name='companyName'
                            placeholder='Enter Company Name'
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                            helperText={formik.touched.companyName && formik.errors.companyName}
                        />
                    </Stack>

                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <div style={styles.inputWrapper}>
                            <input
                                type="file"
                                name="companyImage"
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
                    <Button
                        disableElevation
                        // disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary">
                        Submit
                    </Button>
                </Grid>


            </Grid>
        </form>
    )
}

export default Form
