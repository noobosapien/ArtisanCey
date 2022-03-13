import {
  Card,
  CardActionArea,
  CardMedia,
  Fab,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Clean from '../../public/clean2.jpg';
import Artisan from '../../public/rare.svg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Nature from '../../public/nature.svg';
import Art from '../../public/art.svg';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));

  const handleGoToCL = async (e) => {
    router.push('/category/Clean Living');
  };

  const handleGoToAC = async (e) => {
    router.push('/category/Artisans Corner');
  };

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
          <Grid item xs={3} md="auto" container direction="column">
            <Grid item>
              <Typography
                variant={matchesSM ? 'h6' : 'h2'}
                sx={{
                  fontFamily: 'Monoton',
                  fontSize: matchesMD ? '0.8rem' : '2.5rem',
                  textShadow:
                    '1px 1px rgb(59, 0, 61), -0.2rem 0 .4rem rgb(59, 0, 61)',
                }}
              >
                Clean living
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant={matchesSM ? 'h6' : 'h2'}
                sx={{
                  fontFamily: 'Rancho',
                  fontSize: matchesMD ? '0.8rem' : '2.5rem',
                }}
              >
                The green collection
              </Typography>
            </Grid>

            <Grid item>
              <Image src={Nature.src} alt="art" width={32} height={32} />
            </Grid>

            <Grid item>
              <Fab
                onClick={handleGoToCL}
                color="secondary"
                sx={(theme) => ({
                  '	.MuiFab-root': {
                    background: 'red',
                  },
                })}
              >
                <KeyboardDoubleArrowLeftIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid item xs={8} md={6} lg={4}>
            <Card
              sx={{
                borderRadius: '25%',
              }}
            >
              <CardActionArea onClick={handleGoToCL}>
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
              <CardActionArea onClick={handleGoToAC}>
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

          <Grid
            item
            xs={3}
            md="auto"
            container
            direction="column"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography
                variant={matchesSM ? 'h6' : 'h2'}
                sx={{
                  fontFamily: 'Monoton',
                  fontSize: matchesMD ? '0.8rem' : '2.5rem',
                  textShadow:
                    '1px 1px rgb(59, 0, 61), -0.2rem 0 .4rem rgb(59, 0, 61)',
                }}
              >
                Artisan's corner
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant={matchesSM ? 'h6' : 'h2'}
                sx={{
                  fontFamily: 'Rancho',
                  fontSize: matchesMD ? '0.8rem' : '2.5rem',
                }}
              >
                The rare collection
              </Typography>
            </Grid>

            <Grid item>
              <Image src={Art.src} alt="art" width={32} height={32} />
            </Grid>

            <Grid item>
              <Fab
                onClick={handleGoToAC}
                color="secondary"
                sx={(theme) => ({
                  '	.MuiFab-root': {
                    background: 'red',
                  },
                })}
              >
                <KeyboardDoubleArrowRightIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
