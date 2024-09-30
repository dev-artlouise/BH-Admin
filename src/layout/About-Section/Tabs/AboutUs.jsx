import { Box, Grid } from '@mui/material';
import Form from './AboutUs/Form';
import Content from './AboutUs/Content';

const AboutUs = () => {
  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Form />
        </Grid>

        <Grid item xs={12} md={7}>
          <Content />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
