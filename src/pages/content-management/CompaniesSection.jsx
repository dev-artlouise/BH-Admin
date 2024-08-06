import { Grid } from "@mui/material"

import CompanyForm from "layout/Companies-Section/CompanyForm"

const CompaniesSection = () => {
    return (
        <Grid
            container
            spacing={6}
        >
            <Grid item xs={12} md={5}>
                <CompanyForm />
            </Grid>

            <Grid item xs={12} md={7}>
                Company Content
            </Grid>
        </Grid>
    )
}

export default CompaniesSection
