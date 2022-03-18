import React from 'react';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
    : '10rem';

  // const imgHeight = '100%';

  return (
    <>
      <Grid
        container
        alignItems="flex-end"
        sx={(theme) => ({
          // backgroundImage: `url(${AdornmentSVG.src})`,
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: imgHeight,
          padding: '25rem 40rem 40rem 40rem',
          [theme.breakpoints.up('lg')]: {
            marginTop: '5rem',
          },
          [theme.breakpoints.down('lg')]: {
            padding: '25rem 10rem 30rem 40rem',
            marginTop: '5rem',
          },
          [theme.breakpoints.down('md')]: {
            padding: '20rem 10rem 26rem 40rem',
            marginTop: '5rem',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '2rem 2rem 20rem 2rem',
            marginTop: '5rem',
          },
          [theme.breakpoints.down('xs')]: {
            padding: '2rem 2rem 10rem 2rem',
            marginTop: '5rem',

            overflow: 'hidden',
          },
        })}
      ></Grid>
    </>
  );
}
