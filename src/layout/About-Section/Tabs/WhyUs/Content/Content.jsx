import { Typography } from "@mui/material"
import MainCard from "components/MainCard"

const Content = () => {
    return (
        <MainCard
            Title='Current Content'
        >

            <Typography
                variant='h6'
                gutterBottom
            >
                Current Content
            </Typography>

            <Typography
                variant='h4'
                gutterBottom
            >
                WE CHOOSE US
            </Typography>

            <Typography
                variant="h2"
                gutterBottom
            >
                High-impact design & development services
            </Typography>

            <Typography
                variant="body1"
                gutterBottom
            >
                We take you by hand on each step of the process
            </Typography>
        </MainCard>
    )
}

export default Content
