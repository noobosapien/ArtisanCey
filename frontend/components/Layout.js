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
  Paper,
  Divider,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Close from '@mui/icons-material/Close';
import Logo from '../public/slice5.png';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TopMenu from './TopMenu';
import SearchDialog from './common/SearchDialog';
import { useRouter } from 'next/router';
import { Store } from '../utils/store';
import Sticker from '../public/sticker.png';
import Stars from '../public/stars.svg';
import ContactForm from './common/ContactForm';

import Visa from '../public/visa.png';
import MC from '../public/mastercard.png';
import JCB from '../public/jcb.png';
import AE from '../public/american_express.png';
import CU from '../public/china_union.png';
import Flag from '../public/flag.svg';
import OTP from '../public/OTP.png';

const LogoButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    width: '11rem !important',
  },
  [theme.breakpoints.up('xs')]: {
    width: '11rem !important',
  },
  [theme.breakpoints.up('sm')]: {
    width: '18rem !important',
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

      <SearchDialog openSearch={openSearch} setOpenSearch={setOpenSearch} />

      <AppBar
        position="static"
        elevation={0}
        color="transparent"
        sx={{ marginBottom: '1rem' }}
      >
        <Toolbar disableGutters>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Grid item>
              <NextLink href="/" passHref>
                <LogoButton
                  disableRipple
                  component={Link}
                  // onClick={(event) => router.push('/')}
                >
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

                <Tooltip title="Bag">
                  <NavButton onClick={(e) => router.push('/bag')}>
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

      {/* <TopMenu /> */}
      {/* changes */}
      {children}

      <footer
        style={{
          backgroundColor: '#fff',
          marginTop: '15%',
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}
      >
        <Divider sx={{ marginBottom: '1rem' }} />

        <Grid container alignItems="center">
          <Grid
            item
            container
            alignItems="center"
            direction="column"
            md={3}
            spacing={4}
          >
            <Grid item>
              <Image src={Sticker} alt="sticker" width={50} height={50} />
            </Grid>

            <Grid item>
              <Typography variant="body2">We accept:</Typography>
            </Grid>

            <Grid item container justifyContent="space-evenly">
              <Grid item>
                <Image src={Visa} alt="visa" width={32} height={32} />
              </Grid>

              <Grid item>
                <Image src={MC} alt="visa" width={32} height={32} />
              </Grid>

              <Grid item>
                <Image src={AE} alt="visa" width={32} height={32} />
              </Grid>

              <Grid item>
                <Image src={JCB} alt="visa" width={32} height={32} />
              </Grid>

              <Grid item>
                <Image src={CU} alt="visa" width={32} height={32} />
              </Grid>
            </Grid>

            <Grid item>
              <Typography align="center">
                Currency: USD{' '}
                <Image src={Flag} alt="USD" width={32} height={16} />
              </Typography>{' '}
            </Grid>
          </Grid>

          <Grid item container alignItems="center" direction="column" md={4}>
            <ContactForm />
          </Grid>

          <Grid item container direction="column" alignItems="center" md={4}>
            <Grid item>
              <NextLink href="/about">
                <Typography
                  href="/about"
                  variant="body2"
                  sx={{
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                  }}
                >
                  What is ArtisanCey?
                </Typography>
              </NextLink>
            </Grid>

            <Grid item>
              <NextLink href="/privacy">
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                  }}
                >
                  Privacy
                </Typography>
              </NextLink>
            </Grid>

            <Grid item>
              <NextLink href="/terms">
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                  }}
                >
                  Terms & Conditions
                </Typography>
              </NextLink>
            </Grid>

            <Grid item>
              <NextLink href="/refunds">
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                  }}
                >
                  Returns & Refunds
                </Typography>
              </NextLink>
            </Grid>
          </Grid>
        </Grid>
      </footer>
    </>
  );
}
