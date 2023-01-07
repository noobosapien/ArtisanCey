import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import CactusCard from '../common/CactusCard';

const cacti = [
  'Cactus 1',
  'Cactus 2',
  'Cactus 3',
  'Cactus 4',
  'Cactus 5',
  'Cactus 6',
  'Cactus 7',
  'Cactus 8',
  'Cactus 9',
];
export default function Choose() {
  return (
    <>
      <Grid container justifyContent="space-evenly" spacing={4}>
        {cacti.map(() => (
          <Grid item>
            <CactusCard />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
