import React from 'react';
import { Box, Grid } from '@mui/material';
import Form from './List/Form';
import ListContent from './List/List';

const List = () => {
  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Form />
        </Grid>

        <Grid item xs={12} md={7}>
          <ListContent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default List;
