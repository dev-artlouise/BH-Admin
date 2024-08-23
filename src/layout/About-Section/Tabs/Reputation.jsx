import { Box, Grid } from '@mui/material'

import Content from './Reputation/Content'
import Form from './Reputation/Form'

const Reputation = () => {
    return (
        <Box>
            <Grid
                container
                spacing={6}
            >
                <Grid item xs={12} md={5}>
                    <Form />
                </Grid>

                <Grid item xs={12} md={7}>
                    <Content />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Reputation
