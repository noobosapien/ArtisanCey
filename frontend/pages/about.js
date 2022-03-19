import { Grid, Typography } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';
import { styled } from '@mui/system';
import TriFactor from '../public/trifactor.svg';
import Image from 'next/image';

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
          <Typography variant="h3">What is ArtisanCey?</Typography>
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
            <Grid
              container
              alignItems="center"
              justifyContent="space-evenly"
              spacing={6}
            >
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Rancho',
                    fontSize: '2rem',
                  }}
                >
                  What gives us meaning
                </Typography>
              </Grid>

              <Grid item>
                <Image
                  src={TriFactor}
                  alt="trifactor"
                  height={512}
                  width={512}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{ marginTop: '2rem' }}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            spacing={4}
          >
            <Grid item>
              <MyTypo
                sx={{
                  background: '#3a8783',
                  borderRadius: '40%',
                  fontSize: '2.5rem',
                  padding: '1rem',
                  fontFamily: 'Ranga',
                  color: '#fff',
                }}
              >
                Nature
              </MyTypo>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                sx={{ fontSize: '1.5rem', fontFamily: 'Rancho' }}
              >
                All of our products are eco-friendly it is a characteristic of
                who we are.
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                sx={{ fontSize: '1.5rem', fontFamily: 'Rancho' }}
              >
                We are a start up who firmly believes that time to act against
                the worsening environment is right now and we also know that we
                cannot change it by ourselves.
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                sx={{ fontSize: '1.5rem', fontFamily: 'Rancho' }}
              >
                We want our customers to be a part of it as well.
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                sx={{ fontSize: '1.5rem', fontFamily: 'Rancho' }}
              >
                We will be donating{' '}
                <span style={{ fontSize: '2rem', color: '#3a8783' }}>20%</span>{' '}
                of our income every week to a selected charity.
              </Typography>
            </Grid>

            <Grid item>
              <Typography>This week we are donating to</Typography>
            </Grid>

            <Grid item>{/* Charity */}</Grid>
          </Grid>

          <Grid
            item
            sx={{ marginTop: '2rem' }}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            spacing={4}
          >
            <Grid item>
              <MyTypo
                sx={{
                  background: '#3a8783',
                  borderRadius: '20%',
                  fontSize: '2.5rem',
                  padding: '1rem',
                  fontFamily: 'Ranga',
                  color: '#fff',
                }}
              >
                Our Customers
              </MyTypo>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                sx={{ fontSize: '1.5rem', fontFamily: 'Rancho' }}
              >
                One of the pillars that hold us up are our customers, we deeply
                care about how our products impact the lives of our customers.
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                sx={{ fontSize: '1.5rem', fontFamily: 'Rancho' }}
              >
                It is our solemn duty to provide something to be proud of and
                make you feel you've done something more than just buy an item;
                that you made a positive impact in the world as well.
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{ marginTop: '2rem' }}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            spacing={4}
          >
            <Grid item>
              <MyTypo
                sx={{
                  background: '#3a8783',
                  borderRadius: '20%',
                  fontSize: '2.5rem',
                  padding: '1rem',
                  fontFamily: 'Ranga',
                  color: '#fff',
                }}
              >
                Our Artisans
              </MyTypo>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                sx={{ fontSize: '1.5rem', fontFamily: 'Rancho' }}
              >
                The ones who make all this possible.
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                sx={{ fontSize: '1.5rem', fontFamily: 'Rancho' }}
              >
                Our artisans strive for uniqueness and quality, we could even
                call it perfection, we find it a privilege to work with such
                talent.
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                align="center"
                sx={{ fontSize: '1.5rem', fontFamily: 'Rancho' }}
              >
                Our duty to them is to provide a platform to share what they
                create and make sure that they are appreciated for what they are
                doing.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
