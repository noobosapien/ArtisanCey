import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getLatestProducts } from '../../helpers/getLatestProducts';

export default function LatestProducts() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));

  useEffect(() => {
    getLatestProducts(setProducts);
  }, []);

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
        {products.map((prod) => (
          <Grid item key={prod.id}>
            <ProductCard product={prod} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
