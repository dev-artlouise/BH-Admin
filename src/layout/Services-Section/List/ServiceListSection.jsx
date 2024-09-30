import React from 'react';
import { Grid } from '@mui/material';
import ServicesListForm from './ServicesListForm';
import ServicesListContent from './ServicesListContent';

ServiceListSection.propTypes = {};

function ServiceListSection() {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <ServicesListForm />
        </Grid>

        <Grid item xs={12} md={7}>
          <ServicesListContent />
        </Grid>
      </Grid>
    </div>
  );
}

export default ServiceListSection;
