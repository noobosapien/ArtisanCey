import {
  Grid,
  Button,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import { Store } from '../utils/store';
import CheckoutWizard from '../components/Checkout/CheckoutWizard';
import { useRouter } from 'next/router';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { getPaypalCID } from '../helpers/getPaypalCID';
import { payOrder } from '../helpers/payOrder';

export default function Checkout() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    cart: { cartItems },
  } = state;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: 200 } }],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
        payer: {
          name: {
            given_name: 'John',
            surname: 'Smith',
          },
          email_address: 'ab@gmail.com',
          address: {
            postal_code: '2312',
            country_code: 'NZ',
          },
        },
      })
      .then((orderId) => orderId);
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        const res = await payOrder(details);

        console.log('Order paid');
        router.push('/order/' + res.data.orderID);
      } catch (err) {
        console.log(err);
      }
    });
  }

  function onError(error) {
    alert(error);
  }

  useEffect(() => {
    const loadPaypalScript = async () => {
      const clientId = await getPaypalCID();
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD',
        },
      });

      paypalDispatch({
        type: 'setLoadingStatus',
        value: 'pending',
      });
    };
    loadPaypalScript();
  }, []);

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

        <Grid item>
          {/* <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          ></PayPalButtons> */}
        </Grid>
      </Grid>
    </Layout>
  );
}
