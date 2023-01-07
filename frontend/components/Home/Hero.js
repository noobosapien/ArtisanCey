import { styled } from '@mui/system';
import React, { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import HeroImageWords from '../../public/Hero1words.png';
import HeroImageCacti from '../../public/Hero1cacti.png';
import DownArrow from '../../public/downarrow.png';
import Image from 'next/image';
import { Button, Grid, Grow, Typography } from '@mui/material';

const Animation = styled('div')(({ theme }) => ({
  position: 'absolute',

  [theme.breakpoints.up('md')]: {
    width: '80vw',
    height: '80vw',
    left: '-60vw',
    top: '10vw',
  },
  [theme.breakpoints.down('md')]: {
    width: '100vw',
    height: '100vw',
    left: '-80vw',
    top: '50vw',
  },
  [theme.breakpoints.down('sm')]: {
    width: '150vw',
    height: '150vw',
    left: '-125vw',
  },
  width: '100vw',
  height: '100vw',
  background: 'rgba(58, 135, 131, 0.3)',

  // left: 'calc(50%-75vw)',
  borderRadius: '45%',
  animation: 'rotate 30s infinite',

  '&::before': {
    content: '""',
    width: '100%',
    height: '100%',
    background: 'rgba(189, 242, 239, 0.2)',
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

function Hero2({ matchesMD }) {
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

function Hero1() {
  useEffect(() => {}, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: '-100',
          // clipPath: 'polygon(100% 0, 100% 38%, 100% 100%, 0 11%, 0 0)',
          clipPath: 'circle(50.5% at 100% 1%)',
          background:
            'linear-gradient(0deg, rgba(58,135,131,0.1) 0%, rgba(58,135,99,0.2) 100%)',
        }}
      ></div>
    </>
  );
}

function Select() {
  return (
    <div>
      <div className="header-down-arrow" style={{ left: '5%' }}>
        <Typography>Choose your cactus</Typography>
        <img
          className="header-down-arrow-image"
          src={DownArrow.src}
          layout="intrinsic"
        />
      </div>

      <Typography
        sx={{ position: 'absolute', bottom: '4vh', left: 'calc(50%)' }}
      >
        Or
      </Typography>

      <div className="header-down-arrow" style={{ right: '5%' }}>
        <Typography>Let the cactus choose you</Typography>
        <img
          className="header-down-arrow-image"
          src={DownArrow.src}
          layout="intrinsic"
        />
      </div>
    </div>
  );
}

function Select2() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gap: '10px',
        }}
      >
        <Button size="small">Select your cactus.</Button>

        <Button size="small">Let the cactus choose you.</Button>
      </div>
    </>
  );
}

function Hero3({ matchesMD }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '15vh',
      }}
    >
      {matchesMD ? (
        // <Image src={HeroImageWords} layout="intrinsic" className="hero-words" />
        <div className="hero-words">
          <Typography
            sx={(theme) => ({
              color: theme.palette.common.greenBlue,
              fontWeight: '600',
            })}
            textAlign="left"
            variant="h3"
          >
            Cactus in a
          </Typography>

          <div style={{ marginBottom: '1rem' }} />

          <Typography
            sx={(theme) => ({
              color: theme.palette.common.greenBlue,
              fontWeight: '600',
            })}
            textAlign="center"
            variant="h3"
          >
            <span style={{ fontWeight: '100' }}>Coco</span>nut shell
          </Typography>
        </div>
      ) : (
        <></>
      )}

      {matchesMD ? <div style={{ padding: '2rem' }} /> : <></>}
      {matchesMD ? (
        <Image src={HeroImageCacti} layout="intrinsic" className="hero-cacti" />
      ) : (
        <></>
      )}

      {matchesMD ? <Select2 /> : <></>}
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

  return (
    <>
      <Hero1 />
      <Hero2 matchesMD={matchesMD} />
      <Hero3 matchesMD={matchesMD} />
    </>
  );
}
