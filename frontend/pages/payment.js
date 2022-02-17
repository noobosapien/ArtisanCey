import {
  Grid,
  Button,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import { Store } from '../utils/store';
import CheckoutWizard from '../components/Checkout/CheckoutWizard';
import { useRouter } from 'next/router';

export default function Checkout() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const {
    cart: { cartItems },
  } = state;

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="space-evenly"
        direction="column"
        spacing={4}
      >
        <Grid item alignSelf="center">
          <Button
            size="large"
            startIcon={<ShoppingBagOutlinedIcon />}
            endIcon={<ArrowCircleDownTwoToneIcon />}
          >
            Show bagged items
          </Button>
        </Grid>

        <Grid item alignSelf="center">
          <Paper
            sx={(theme) => ({
              padding: '1rem',
              background: theme.palette.common.greenBlue,
            })}
          >
            <Typography
              variant="h5"
              sx={(theme) => ({
                fontFamily: 'Roboto',
                color: theme.palette.common.white,
              })}
            >
              Total: ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              .00{' '}
            </Typography>
          </Paper>

          <Typography
            variant="subtitle2"
            sx={(theme) => ({
              fontSize: '0.6rem',
              color: theme.palette.common.lightGray,
            })}
          >
            *including shipping
          </Typography>
        </Grid>

        <Grid item>
          <CheckoutWizard activeStep={2} />
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          alignItems="space-between"
          direction="column"
          spacing={0}
        >
          <Grid item component={Card}>
            <CardHeader
              title="Contact:"
              sx={(theme) => ({
                '& 	.MuiCardHeader-title': {
                  fontFamily: 'Roboto',
                  fontSize: '0.8rem',
                  color: theme.palette.common.greenBlue,
                },
              })}
            />

            <CardContent>
              <Grid container justifyContent="space-evenly">
                <Grid item xs={8}>
                  <Typography
                    sx={(theme) => ({
                      fontFamily: 'Roboto',
                      fontSize: '1.0rem',
                      color: theme.palette.common.black,
                    })}
                  >
                    email@email.com
                  </Typography>
                </Grid>

                <Grid item>
                  <Button variant="outlined" size="small">
                    change
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>

          <Grid item component={Card}>
            <CardHeader
              title="Ship to:"
              sx={(theme) => ({
                '& 	.MuiCardHeader-title': {
                  fontFamily: 'Roboto',
                  fontSize: '0.8rem',
                  color: theme.palette.common.greenBlue,
                },
              })}
            />

            <CardContent>
              <Grid container justifyContent="space-evenly">
                <Grid item xs={8}>
                  <Typography
                    sx={(theme) => ({
                      fontFamily: 'Roboto',
                      fontSize: '1.0rem',
                      color: theme.palette.common.black,
                    })}
                  >
                    270 S 5th St, Brooklyn, North Dakota, 11211, USA
                  </Typography>
                </Grid>

                <Grid item>
                  <Button variant="outlined" size="small">
                    change
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>

          <Grid item component={Card}>
            <CardHeader
              title="Shipping method:"
              sx={(theme) => ({
                '& 	.MuiCardHeader-title': {
                  fontFamily: 'Roboto',
                  fontSize: '0.8rem',
                  color: theme.palette.common.greenBlue,
                },
              })}
            />

            <CardContent>
              <Grid container justifyContent="space-evenly">
                <Grid item xs={8}>
                  <Typography
                    sx={(theme) => ({
                      fontFamily: 'Roboto',
                      fontSize: '1.0rem',
                      color: theme.palette.common.black,
                    })}
                  >
                    Express worldwide (1-2 days) - $10.00
                  </Typography>
                </Grid>

                <Grid item>
                  <Button variant="outlined" size="small">
                    change
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>

        <Grid item>
          <Typography
            sx={(theme) => ({
              fontFamily: 'Roboto',
              fontSize: '1.0rem',
              color: theme.palette.common.greenBlue,
            })}
          >
            Payment method
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}
