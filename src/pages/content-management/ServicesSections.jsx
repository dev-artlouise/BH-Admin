import { Grid } from "@mui/material"

import ServicesForm from "layout/Services-Section/ServicesForm"

const ServicesSections = () => {
    return (
        <Grid
            container
            spacing={6}
        >
            <Grid item xs={12} md={5}>
                <ServicesForm />
            </Grid>

            <Grid item xs={12} md={7}>
                Company Content
            </Grid>
        </Grid>
    )
}

export default ServicesSections
