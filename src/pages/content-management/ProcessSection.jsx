import { Grid } from "@mui/material"

import ProcessForm from 'layout/Process-Section/ProcessForm'

const ProcessSection = () => {
    return (
        <Grid
            container
            spacing={6}
        >
            <Grid item xs={12} md={5}>
                <ProcessForm />
            </Grid>

            <Grid item xs={12} md={7}>
                Company Content
            </Grid>
        </Grid>
    )
}

export default ProcessSection
