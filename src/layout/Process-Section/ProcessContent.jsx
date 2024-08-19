import { Typography, Grid } from "@mui/material";

import MainCard from "components/MainCard";
import MUIImageCard from "components/common/MuiImageCard"

const ProcessContent = () => {

    const handleDelete = () => {
        console.log("Delete button clicked");
    };

    return (
        <MainCard
            Title="Current Company Section"
        >
            <Typography
                variant='h4'
                gutterBottom
            >
                Current Processes
            </Typography>

            <Grid
                container
            >
                {/* loop the company images here with companies api */}

                <Grid
                    xs={3}>
                    <MUIImageCard
                        imageSrc="https://via.placeholder.com/150"
                        title="Sample Card"
                        onDelete={handleDelete}
                    />
                </Grid>
            </Grid>

        </MainCard>
    )
}

export default ProcessContent
