import React from 'react';
import { Grid } from '@mui/material';
import ProcessListForm from './ProcessListForm';
import ProcessListContent from './ProcessListContent';

ProcessListSection.propTypes = {};

function ProcessListSection() {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <ProcessListForm />
        </Grid>

        <Grid item xs={12} md={7}>
          <ProcessListContent />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProcessListSection;
