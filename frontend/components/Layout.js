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
  Input,
  Toolbar,
  Typography,
  TextField,
  Grid,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Close from '@mui/icons-material/Close';
import Logo from '../public/slice1.svg';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/system';
import TopMenu from './TopMenu';

const LogoButton = styled(Button)(({ theme }) => ({
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

const NavButton = styled(IconButton)(({ theme }) => ({
  // [theme.breakpoints.up('xs')]: {
  //   width: '32px !important',
  // },
  // [theme.breakpoints.up('sm')]: {
  //   width: '32px !important',
  // },
  // [theme.breakpoints.up('md')]: {
  //   width: '32px !important',
  // },
  // [theme.breakpoints.up('lg')]: {
  //   width: '32px !important',
  // },

  top: '1rem',
}));

const CustomLogo = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    // width: '10rem !important',
  },
  // width: '10px',
}));

export default function Layout({ title, description, children }) {
  const [openShipping, setOpenShipping] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);

  const openSearchHandler = (e) => {
    setOpenSearch(true);
  };

  const closeSearchHandler = (e) => {
    setOpenSearch(false);
  };

  return (
    <>
      <Head>
        <title>{title ? `${title}` : 'Artisan Cey'}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <Stack sx={{ width: '100%' }} justifyContent="center" spacing={2}>
        <Collapse in={openShipping}>
          <Alert
            iconMapping={{ success: <LocalShippingIcon /> }}
            action={
              <IconButton
                disableRipple
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
            <Typography variant="body2" component="p">
              Free shipping for orders over $75!
            </Typography>
          </Alert>
        </Collapse>
      </Stack>

      <Dialog
        open={openSearch}
        onClose={closeSearchHandler}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              marginBottom: '5%',
            }}
          >
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              id="searchField"
              label="Search..."
              variant="standard"
              autoFocus
            />
          </Box>

          <Divider />
        </DialogContent>
      </Dialog>

      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar disableGutters>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Grid item>
              <LogoButton>
                <CustomLogo src={Logo} alt="Logo" />
              </LogoButton>
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Search">
                  <NavButton onClick={openSearchHandler}>
                    <SearchIcon />
                  </NavButton>
                </Tooltip>

                <Tooltip title="Cart">
                  <NavButton>
                    <ShoppingCartIcon />
                  </NavButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <TopMenu />

      {/* <Container> */}
      {children}
      {/* </Container> */}

      <footer>{/* <Typography>All rights reserved.</Typography> */}</footer>
    </>
  );
}
