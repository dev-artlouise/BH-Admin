import { Grid, Stack, InputLabel, OutlinedInput, Button } from '@mui/material'

const ProcessForm = () => {
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
                        <InputLabel htmlFor="companyName">Title</InputLabel>
                        <OutlinedInput
                            id="companyName"
                            // type="firstname"
                            // value={values.firstname}
                            // name="firstname"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            placeholder="Enter process title"
                            fullWidth
                        // error={Boolean(touched.firstname && errors.firstname)}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="content">Content</InputLabel>
                        <OutlinedInput
                            id="content"
                            // type="firstname"
                            // value={values.firstname}
                            // name="firstname"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            placeholder="Enter process content"
                            fullWidth
                            multiline
                            rows={4}
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

export default ProcessForm
