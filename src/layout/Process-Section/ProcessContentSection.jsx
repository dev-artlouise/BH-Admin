import React from 'react';
import { Grid } from '@mui/material';
import ProcessForm from './ProcessForm';
import ProcessContent from './ProcessContent';

ProcessContentSection.propTypes = {};

function ProcessContentSection() {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <ProcessForm />
        </Grid>

        <Grid item xs={12} md={7}>
          <ProcessContent />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProcessContentSection;
