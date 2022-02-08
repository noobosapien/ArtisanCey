import { Grid, Typography } from '@mui/material';
import React from 'react';
import ProductCard from '../common/ProductCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function LatestProducts() {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));

  const justify = matchesMD
    ? 'center'
    : matchesLG
    ? 'space-around'
    : 'space-around';

  return (
    <Grid
      container
      spacing={10}
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ marginTop: '0%' }}
    >
      <Grid item>
        <Typography variant="h3">Latest items in our catalouge</Typography>
      </Grid>

      <Grid item container justifyContent={justify} spacing={10}>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
      </Grid>
    </Grid>
  );
}
