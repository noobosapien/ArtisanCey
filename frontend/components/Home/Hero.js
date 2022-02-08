import { Button, Grid, Typography, Zoom } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Coconuts from '../../public/coconuts.svg';
import Candle from '../../public/candle.svg';
import CoverSVG from '../../public/cover.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function Hero1({ imgWidth, imgHeight, matchesLG }) {
  return (
    <Zoom in unmountOnExit>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          <Image
            src={Coconuts}
            width={imgWidth}
            height={imgHeight}
            alt="Coconut"
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3" component="h1">
                Coconut Shell Bowls
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant={matchesLG ? 'body1' : 'h5'} align="center">
                Our shell bowls are hand crafted for perfection and comes with a
                lifetime warranty!
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined">Explore</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Zoom>
  );
}

function Hero2({ imgWidth, imgHeight, matchesLG }) {
  return (
    <Zoom in unmountOnExit>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          <Image
            src={Candle}
            width={imgWidth}
            height={imgHeight}
            alt="Coconut"
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3" component="h1">
                Coconut Candles
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant={matchesLG ? 'body1' : 'h5'} align="center">
                Our candle are hand crafted for perfection and comes with a
                lifetime warranty with many scents to choose from!
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined">Explore</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Zoom>
  );
}

function Hero3({ imgWidth, imgHeight, matchesLG }) {
  return (
    <>
      <Grid
        container
        sx={(theme) => ({
          backgroundImage: `url(${CoverSVG.src})`,
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          zIndex: -1,
          width: '100%',
          height: imgHeight,
          padding: '25rem 40rem 40rem 40rem',
          [theme.breakpoints.down('lg')]: {
            padding: '25rem 10rem 30rem 40rem',
          },
          [theme.breakpoints.down('md')]: {
            padding: '20rem 10rem 26rem 40rem',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '2rem 2rem 20rem 2rem',
          },
          [theme.breakpoints.down('xs')]: {
            padding: '2rem 2rem 10rem 2rem',

            overflow: 'hidden',
          },
        })}
      ></Grid>
    </>
  );
}

export default function Hero() {
  const theme = useTheme();

  const [currentHero, setCurrentHero] = useState(<></>);
  const [heroId, setHeroId] = useState(0);

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

  useEffect(() => {
    setHeroId(1);
    setCurrentHero(
      <Hero1 imgHeight={imgHeight} imgWidth={imgWidth} matchesLg={matchesLG} />
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (heroId === 0) {
        setHeroId(1);

        setCurrentHero(
          <Hero1
            imgHeight={imgHeight}
            imgWidth={imgWidth}
            matchesLg={matchesLG}
          />
        );
      } else if (heroId === 1) {
        setHeroId(0);

        setCurrentHero(
          <Hero2
            imgHeight={imgHeight}
            imgWidth={imgWidth}
            matchesLg={matchesLG}
          />
        );
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentHero]);

  // return <>{currentHero}</>;
  return (
    <Hero3 imgHeight={imgHeight} imgWidth={imgWidth} matchesLg={matchesLG} />
  );
}
