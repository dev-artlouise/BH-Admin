import { Grid, Stack, InputLabel, OutlinedInput, Button } from '@mui/material'

const CompanyForm = () => {
    return (
        <form>
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
                        <InputLabel htmlFor="companyName">Company Name</InputLabel>
                        <OutlinedInput
                            id="companyName"
                            // type="firstname"
                            // value={values.firstname}
                            // name="firstname"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            placeholder="Enter Company Name"
                            fullWidth
                        // error={Boolean(touched.firstname && errors.firstname)}
                        />
                    </Stack>

                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="companyImage">Upload Company Image</InputLabel>
                        <OutlinedInput
                            id="companyImage"
                            type="file"
                            inputProps={{ accept: 'image/*' }}
                            // value={values.firstname}
                            // name="firstname"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            fullWidth
                        // error={Boolean(touched.firstname && errors.firstname)}
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

export default CompanyForm
