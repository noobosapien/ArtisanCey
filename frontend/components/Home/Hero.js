import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import Coconuts from '../../public/coconuts.svg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
        </Grid>
      </Grid>
    </Grid>
  );
}
