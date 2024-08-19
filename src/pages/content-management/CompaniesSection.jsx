import { Grid } from "@mui/material"

import CompanyForm from "layout/Companies-Section/CompanyForm"
import CompanyContent from "layout/Companies-Section/CompanyContent"

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
                <CompanyContent />
            </Grid>
        </Grid>
    )
}

export default CompaniesSection
