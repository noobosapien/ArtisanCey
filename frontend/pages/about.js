import { Grid, Typography } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';
import { styled } from '@mui/system';

const MyTypo = styled(Typography)({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  borderRadius: 4,
  fontSize: '1.4rem',
  fontFamily: 'Roboto',
});

export default function About() {
  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{ paddingTop: '2rem' }}
      >
        <Grid item>
          <Typography variant="h3">About Us</Typography>
        </Grid>

        <Grid item xs={12} />

        <Grid
          item
          container
          direction="column"
          xs={10}
          md={8}
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <MyTypo></MyTypo>
          </Grid>

          <Grid item>
            <Grid container>
              <Grid item>
                <MyTypo></MyTypo>
              </Grid>

              <Grid item></Grid>
            </Grid>
          </Grid>

          {/* <Grid item>
            <MyTypo></MyTypo>
          </Grid>

          <Grid item sx={{ marginTop: '2rem' }}>
            <MyTypo sx={{ background: '#bdf2ef66' }}>
              As you can see when you go thorugh our catalogue it's all
              sustainable, eco friendly and very unique.
            </MyTypo>
          </Grid>

          <Grid item>
            <MyTypo sx={{ background: '#bdf2ef66' }}>
              We really would like to emphasize the fact that the artisans
              working here passionate and equally skilled at what they do.
            </MyTypo>
          </Grid>

          <Grid item>
            <MyTypo>
              We do not source our products in massive amount hand made by
              artisans from the beautiful isle of Ceylon
            </MyTypo>
          </Grid> */}
        </Grid>
      </Grid>
    </Layout>
  );
}
