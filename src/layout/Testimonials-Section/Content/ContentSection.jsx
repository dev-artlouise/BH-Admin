import { Grid } from '@mui/material';
import React from 'react';
import Form from './Form';
import Content from './Content';

function ContentSection() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5}>
        <Form />
      </Grid>

      <Grid item xs={12} md={7}>
        <Content />
      </Grid>
    </Grid>
  );
}

export default ContentSection;
