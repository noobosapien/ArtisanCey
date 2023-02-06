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
export default function Choose({ products }) {
  return (
    <>
      <Grid conteiner direction={'column'} alignItems={'center'}>
        <Grid item sx={{ marginBottom: '8rem' }}>
          <Typography
            textAlign="center"
            variant="h2"
            sx={(theme) => ({
              [theme.breakpoints.down['md']]: {
                fontSize: '1rem',
                color: theme.palette.common.greenBlue,
              },
            })}
          >
            - All The Cacti -
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" spacing={10}>
          {products instanceof Array ? (
            products.map((product) => (
              <Grid item>
                <CactusCard product={product} />
              </Grid>
            ))
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
}
