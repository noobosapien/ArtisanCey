import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Alert,
  AppBar,
  Button,
  Collapse,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Grid,
  Tooltip,
  Link,
  Badge,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Close from '@mui/icons-material/Close';
import Logo from '../public/slice1.svg';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Box } from '@mui/system';
import TopMenu from './TopMenu';
import SearchDialog from './common/SearchDialog';
import { useRouter } from 'next/router';
import { Store } from '../utils/store';

const LogoButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    width: '8rem !important',
  },
  [theme.breakpoints.up('sm')]: {
    width: '10rem !important',
  },
  [theme.breakpoints.up('md')]: {
    width: '18rem !important',
  },
  [theme.breakpoints.up('lg')]: {
    width: '24rem !important',
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
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const { cart } = state;
  const [openShipping, setOpenShipping] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);

  const openSearchHandler = (e) => {
    setOpenSearch(true);
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

      <SearchDialog openSearch={openSearch} setOpenSearch={setOpenSearch} />

      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar disableGutters>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Grid item>
              <NextLink href="/" passHref>
                <LogoButton disableRipple component={Link}>
                  <CustomLogo src={Logo} alt="Logo" />
                </LogoButton>
              </NextLink>
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Search">
                  <NavButton onClick={openSearchHandler} size="large">
                    <SearchIcon
                      sx={(theme) => ({
                        [theme.breakpoints.up('lg')]: {
                          fontSize: '3.0rem',
                        },
                        [theme.breakpoints.down('lg')]: {
                          fontSize: '2.5rem',
                        },
                        [theme.breakpoints.down('sm')]: {
                          fontSize: '1.5rem',
                        },
                      })}
                    />
                  </NavButton>
                </Tooltip>

                <Tooltip title="Cart">
                  <NavButton onClick={(e) => router.push('/cart')}>
                    {cart.cartItems.length ? (
                      <Badge
                        color="primary"
                        badgeContent={cart.cartItems.length}
                        showZero
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        overlap="circular"
                      >
                        <ShoppingBagIcon
                          sx={(theme) => ({
                            [theme.breakpoints.up('lg')]: {
                              fontSize: '3.0rem',
                            },
                            [theme.breakpoints.down('lg')]: {
                              fontSize: '2.5rem',
                            },
                            [theme.breakpoints.down('sm')]: {
                              fontSize: '1.5rem',
                            },
                          })}
                        />
                      </Badge>
                    ) : (
                      <ShoppingBagIcon
                        sx={(theme) => ({
                          [theme.breakpoints.up('lg')]: {
                            fontSize: '3.0rem',
                          },
                          [theme.breakpoints.down('lg')]: {
                            fontSize: '2.5rem',
                          },
                          [theme.breakpoints.down('sm')]: {
                            fontSize: '1.5rem',
                          },
                        })}
                      />
                    )}
                  </NavButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <TopMenu />

      {children}

      <footer
        style={{
          backgroundColor: '#C3E6D3',
          marginTop: '15%',
        }}
      >
        <Typography>All rights reserved.</Typography>
      </footer>
    </>
  );
}
