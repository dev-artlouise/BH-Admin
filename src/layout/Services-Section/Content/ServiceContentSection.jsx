import React from 'react';
import { Grid } from '@mui/material';
import ServicesForm from './ServicesForm';
import ServicesContent from './ServicesContent';

ServiceContentSection.propTypes = {};

function ServiceContentSection() {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <ServicesForm />
        </Grid>

        <Grid item xs={12} md={7}>
          <ServicesContent />
        </Grid>
      </Grid>
    </div>
  );
}

export default ServiceContentSection;
