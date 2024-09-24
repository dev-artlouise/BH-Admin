import { Grid } from '@mui/material';

import ProcessForm from 'layout/Process-Section/ProcessForm';
import ProcessContent from 'layout/Process-Section/ProcessContent';

const ProcessSection = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5}>
        <ProcessForm />
      </Grid>

      <Grid item xs={12} md={7}>
        <ProcessContent />
      </Grid>
    </Grid>
  );
};

export default ProcessSection;
