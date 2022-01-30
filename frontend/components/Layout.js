import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Alert,
  AppBar,
  Button,
  Collapse,
  Container,
  IconButton,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Close from '@mui/icons-material/Close';
import Logo from '../public/slice1.svg';
import { styled } from '@mui/material/styles';

const ImageButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    width: '128px !important',
  },
  [theme.breakpoints.up('sm')]: {
    width: '160px !important',
  },
  [theme.breakpoints.up('md')]: {
    width: '192px !important',
  },
  [theme.breakpoints.up('lg')]: {
    width: '224px !important',
  },

  top: '1rem',
}));

const CustomImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    // width: '10rem !important',
  },
  // width: '10px',
}));

export default function Layout({ title, description, children }) {
  const [openShipping, setOpenShipping] = useState(true);

  return (
    <>
      <Head>
        <title>{title ? `${title} - Next fire` : 'Next fire'}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <Stack sx={{ width: '100%' }} spacing={2}>
        <Collapse in={openShipping}>
          <Alert
            iconMapping={{ success: <LocalShippingIcon /> }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenShipping(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Free shipping for orders over $75!
          </Alert>
        </Collapse>
      </Stack>

      <AppBar position="static" elevation={0}>
        <Toolbar disableGutters>
          <ImageButton>
            <CustomImage src={Logo} alt="Logo" />
          </ImageButton>
        </Toolbar>
      </AppBar>

      <Container>{children}</Container>

      <footer>
        <Typography>All rights reserved.</Typography>
      </footer>
    </>
  );
}
