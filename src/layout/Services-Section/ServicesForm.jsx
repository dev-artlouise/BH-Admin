import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Grid, Stack, InputLabel, OutlinedInput, Button } from '@mui/material'

import MUITextField from 'components/common/MUITextField'

const validationSchema = Yup.object({
    serviceTitle: Yup.string().required('Title is required'),
});

const ServicesForm = () => {

    const formik = useFormik({
        initialValues: {
            serviceTitle: '',
            serviceContent: '',
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
                            label='Title'
                            name='serviceTitle'
                            placeholder='Enter Title'
                            value={formik.values.serviceTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            error={formik.touched.serviceTitle && Boolean(formik.errors.serviceTitle)}
                            helperText={formik.touched.serviceTitle && formik.errors.serviceTitle}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={1}>

                        <MUITextField
                            label='Content'
                            name='serviceContent'
                            placeholder='Enter Content'
                            value={formik.values.serviceContent}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            multiline
                            rows={4}
                            error={formik.touched.serviceContent && Boolean(formik.errors.serviceContent)}
                            helperText={formik.touched.serviceContent && formik.errors.serviceContent}
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

export default ServicesForm
