import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
// import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Clean from '../../public/clean.jpg';
import Artisan from '../../public/elephant.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Animation = styled('div')(({ theme }) => ({
  position: 'absolute',

  [theme.breakpoints.up('md')]: {
    width: '80vw',
    height: '80vw',
    left: '-60vw',
  },
  [theme.breakpoints.down('md')]: {
    width: '100vw',
    height: '100vw',
    left: '-80vw',
  },
  [theme.breakpoints.down('sm')]: {
    width: '150vw',
    height: '150vw',
    left: '-125vw',
  },
  width: '100vw',
  height: '100vw',
  background: 'rgba(58, 135, 131, 1.0)',
  top: '10vw',
  // left: 'calc(50%-75vw)',
  borderRadius: '45%',
  animation: 'rotate 30s infinite',

  '&::before': {
    content: '""',
    width: '100%',
    height: '100%',
    background: 'rgba(189, 242, 239, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: '40%',
    animation: 'rotate 30s infinite',
  },

  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0)',
    },

    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

function Hero2() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        zIndex: -1,
      }}
    >
      <Animation />
    </div>
  );
}

export default function Hero() {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));

  const imgWidth = matchesXS
    ? 100
    : matchesSM
    ? 200
    : matchesMD
    ? 200
    : matchesLG
    ? 300
    : matchesXL
    ? 300
    : 300;
  const imgHeight = matchesXS
    ? 100
    : matchesSM
    ? 200
    : matchesMD
    ? 200
    : matchesLG
    ? 300
    : matchesXL
    ? 300
    : 300;

  return (
    <>
      <Hero2 />

      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ marginTop: '10rem' }}
        spacing={4}
      >
        <Grid item container justifyContent="space-around" alignItems="center">
          <Grid item>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Monton',
              }}
            >
              Clean living
            </Typography>
          </Grid>
          <Grid item xs={8} md={6} lg={4}>
            <Card
              sx={{
                borderRadius: '25%',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100%"
                  image={Clean.src}
                  alt="clean living"
                  sx={{
                    opacity: 0.7,
                    transform: `perspective(1000px) rotateY(120 deg) translateZ(120 px)`,
                  }}
                />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Grid item container justifyContent="space-around" alignItems="center">
          <Grid item xs={8} md={6} lg={4}>
            <Card sx={{ borderRadius: '25%' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100%"
                  image={Artisan.src}
                  alt="artisan's corner"
                  sx={{
                    opacity: 0.7,
                  }}
                />
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item>
            <Typography variant="h2">Artisan's corner</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
