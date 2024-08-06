import React from 'react'
import { Grid, Stack, InputLabel, OutlinedInput, Button } from '@mui/material'

const HeroForm = () => {
    return (
        <form>
            <Grid
                container
                spacing={3}
                direction='column'
            >
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <OutlinedInput
                            id="title"
                            // type="firstname"
                            // value={values.firstname}
                            // name="firstname"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            placeholder="Enter Title"
                            fullWidth
                        // error={Boolean(touched.firstname && errors.firstname)}
                        />
                    </Stack>
                    {/* {touched.firstname && errors.firstname && (
                        <FormHelperText error id="helper-text-firstname-signup">
                            {errors.firstname}
                        </FormHelperText>
                    )} */}

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
                            placeholder="Enter Content"
                            fullWidth
                            multiline
                            rows={4}
                        // error={Boolean(touched.firstname && errors.firstname)}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="hero-image">Upload Hero Image</InputLabel>
                        <OutlinedInput
                            id="hero-image"
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
        </form >
    )
}

export default HeroForm
