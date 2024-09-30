import { Divider, Grid, Stack } from '@mui/material';
import Content from './OurTeam/Content';
import Form from './OurTeam/Form';
import Preview from './OurTeam/Preview';

const OurTeam = () => {
  return (
    <Stack gap={5}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={7}>
          <Form />
        </Grid>

        <Grid item xs={12} md={5}>
          <Preview />
        </Grid>
      </Grid>

      <Divider />
      <Content />
    </Stack>
  );
};

export default OurTeam;
