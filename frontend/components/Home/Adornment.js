import Image from 'next/image';
import React from 'react';
import AdornmentSVG from '../../public/adornment.svg';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

export default function Adornment() {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));

  const imgHeight = matchesXS
    ? '10rem'
    : matchesSM
    ? '10rem'
    : matchesMD
    ? '10rem'
    : matchesLG
    ? '10rem'
    : matchesXL
    ? '10rem'
    : '20rem';

  return (
    <>
      <Grid
        container
        sx={(theme) => ({
          backgroundImage: `url(${AdornmentSVG.src})`,
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: imgHeight,
          padding: '30rem 10rem 10rem 10rem',
          [theme.breakpoints.down('lg')]: {
            padding: '20rem 2rem 2rem 2rem',
          },
          [theme.breakpoints.down('xs')]: {
            overflow: 'hidden',
          },
        })}
      >
        <Grid item></Grid>
      </Grid>
    </>
  );
}
