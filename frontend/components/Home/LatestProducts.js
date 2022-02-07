import { Grid, Typography } from '@mui/material';
import React from 'react';

export default function LatestProducts() {
  return (
    <Grid
      container
      spacing={10}
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: '0%' }}
    >
      <Grid item>
        <Typography variant="h3">Latest items in our catalouge</Typography>
      </Grid>
    </Grid>
  );
}
