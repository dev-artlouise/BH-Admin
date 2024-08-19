import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Grid, Stack, InputLabel, OutlinedInput, Button } from '@mui/material'

import MUITextField from 'components/common/MUITextField';

const validationSchema = Yup.object({
    processTitle: Yup.string().required('Title is required'),
});

const ProcessForm = () => {

    const formik = useFormik({
        initialValues: {
            processTitle: '',
            processContent: '',
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            console.log(values)
        }
    })

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
                            label='Process Title'
                            name='processTitle'
                            placeholder='Enter Title'
                            value={formik.values.processTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            error={formik.touched.processTitle && Boolean(formik.errors.processTitle)}
                            helperText={formik.touched.processTitle && formik.errors.processTitle}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={1}>

                        <MUITextField
                            label='Content'
                            name='processContent'
                            placeholder='Enter Content'
                            value={formik.values.processContent}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            multiline
                            rows={4}
                            error={formik.touched.processContent && Boolean(formik.errors.processContent)}
                            helperText={formik.touched.processContent && formik.errors.processContent}
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
                        color="primary">
                        Submit
                    </Button>
                </Grid>


            </Grid>
        </form>
    )
}

export default ProcessForm
