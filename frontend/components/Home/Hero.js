import { Button, Grid, Typography, Zoom } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Coconuts from '../../public/coconuts.svg';
import Candle from '../../public/candle.svg';
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

  return <>{currentHero}</>;
}
