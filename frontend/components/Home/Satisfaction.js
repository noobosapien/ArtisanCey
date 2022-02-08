import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Tree from '../../public/Tree.svg';

export default function Satisfaction() {
  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      container
      spacing={4}
      sx={{
        marginTop: '10%',
      }}
    >
      <Grid item>
        <Image src={Tree} alt="tree" width="300px" height="300px" />
      </Grid>

      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Typography>Commited to quality and customer satisfaction</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" sx={(theme) => ({})}>
            Explore
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
