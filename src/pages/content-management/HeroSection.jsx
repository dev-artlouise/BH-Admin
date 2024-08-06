import { Grid } from "@mui/material"

import HeroForm from "layout/Hero-Section/HeroForm"
import HeroContent from "layout/Hero-Section/HeroContent"


const HeroSection = () => {
    return (
        <Grid
            container
            spacing={6}
        >
            <Grid item xs={12} md={5}>
                <HeroForm />
            </Grid>

            <Grid item xs={12} md={7}>
                <HeroContent />
            </Grid>
        </Grid>
    )
}

export default HeroSection
