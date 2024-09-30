import { Grid, Stack } from '@mui/material';
import Form from './SocialMedia/Form';
import Content from './SocialMedia/Content';

const SocMed = () => {
  return (
    <Stack gap={5}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Form />
        </Grid>

        <Grid item xs={12} md={7}>
          <Content />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SocMed;
