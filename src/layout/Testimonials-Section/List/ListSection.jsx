import { Grid } from '@mui/material';
import React from 'react';
import ListForm from './ListForm';
import ListContent from './ListContent';

function ListSection() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5}>
        <ListForm />
      </Grid>

      <Grid item xs={12} md={7}>
        <ListContent />
      </Grid>
    </Grid>
  );
}

export default ListSection;
