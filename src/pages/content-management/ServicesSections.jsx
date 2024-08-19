import { Grid } from "@mui/material"

import ServicesForm from "layout/Services-Section/ServicesForm"
import ServicesContent from "layout/Services-Section/ServicesContent"

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
                <ServicesContent />
            </Grid>
        </Grid>
    )
}

export default ServicesSections
