import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsBoatFilledTwoToneIcon from '@mui/icons-material/DirectionsBoatFilledTwoTone';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { v4 as uuidv4 } from 'uuid';
import { processOrder } from '../../helpers/processOrder';
import { placeOrder } from '../../helpers/placeOrder';
import countries from '../../utils/countries';
import BillingAddress from './BillingAddress';

export default function PaymentCard({ loading, setLoading }) {
  const { state, dispatch } = useContext(Store);
  const [clientSecret, setClientSecret] = useState(null);
  const [cardValid, setCardValid] = useState(false);
  const [diff, setDiff] = useState(false);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const {
    cart: {
      cartItems,
      shippingAddress,
      shippingCountry,
      billingAddress,
      shippingMethod,
    },
  } = state;

  useEffect(() => {
    const idempotencyKey = uuidv4();

    const sendOrder = async () => {
      try {
        const total = (
          cartItems.reduce((a, c) => a + c.quantity * c.price, 0) +
          (shippingMethod.value === 'standard' ? 10 : 20)
        ).toFixed(2);

        const result = await processOrder({
          items: cartItems,
          total,
          shippingOption: {
            label: state.cart.shippingMethod && state.cart.shippingMethod.value,
            price:
              state.cart.shippingMethod &&
              state.cart.shippingMethod.value === 'express'
                ? 20
                : 10,
          },
          idempotencyKey,
          shippingAddress,
        });

        if (result.client_secret) {
          setClientSecret(result.client_secret);
        }
      } catch (e) {
        console.log(e);
      }
    };
    sendOrder();
    setClientSecret(null);
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();

    const idempotencyKey = uuidv4();

    const cardElement = elements.getElement(CardElement);

    if (cardValid) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    var result;
    console.log(billingAddress);

    if (diff) {
      result = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              address: {
                city: billingAddress?.city?.value,
                state: billingAddress?.region?.value,
                line1: billingAddress?.address?.value,
              },
              email: shippingAddress?.email?.value,
              name: `${billingAddress?.firstName?.value} ${billingAddress?.lastName?.value}`,
              phone: billingAddress?.phone?.value,
            },
          },
        },
        {
          idempotencyKey,
        }
      );
    } else {
      result = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              address: {
                city: shippingAddress.city.value,
                state: shippingAddress.region.value,
                line1: shippingAddress.address.value,
              },
              email: shippingAddress.email.value,
              name: `${shippingAddress.firstName.value} ${shippingAddress.lastName.value}`,
              phone: shippingAddress.phone.value,
            },
          },
        },
        {
          idempotencyKey,
        }
      );
    }

    if (result.error) {
      console.log(result.error.message);
      setLoading(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      console.log('Success');

      try {
        const total = (
          cartItems.reduce((a, c) => a + c.quantity * c.price, 0) +
          (shippingMethod.value === 'standard' ? 10 : 20)
        ).toFixed(2);

        const subtotal = cartItems
          .reduce((a, c) => a + c.quantity * c.price, 0)
          .toFixed(2);

        const country = countries.filter(
          (c) => c.code === shippingCountry.value
        );

        const order = await placeOrder({
          items: cartItems,
          total,
          subtotal,
          country,
          shippingOption: {
            label: state.cart.shippingMethod && state.cart.shippingMethod.value,
            price:
              state.cart.shippingMethod &&
              state.cart.shippingMethod.value === 'express'
                ? 20
                : 10,
          },
          shippingAddress,
          billingAddress,
          orderId: clientSecret,
        });

        if (order.message === 'success') {
          dispatch({ type: 'CART_CLEAR' });

          router.push(`/order/${order.link}`);
        }
      } catch (e) {}
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
  };

  const handleCardChange = async (e) => {
    if (e.complete) {
      setCardValid(true);
    } else {
      setCardValid(false);
    }
  };

  const cardWrapper = (
    <form onChange={handleSubmit} style={{}}>
      <CardElement onChange={handleCardChange} />
    </form>
  );

  return (
    <Card variant="outlined" sx={{}}>
      <CardContent>
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AlternateEmailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Email"
              secondary={`${
                state.cart.shippingAddress
                  ? state.cart.shippingAddress.email.value
                  : ''
              }`}
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HomeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Delivery address"
              secondary={`${
                state.cart.shippingAddress
                  ? `${state.cart.shippingAddress.address.value}, 
                            ${state.cart.shippingAddress.apartment.value}, 
                            ${state.cart.shippingAddress.city.value},
                            ${state.cart.shippingAddress.region.value},
                            ${state.cart.shippingCountry.value}`
                  : ''
              }`}
            />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DirectionsBoatFilledTwoToneIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Shipping method"
              secondary={`${
                state.cart.shippingMethod &&
                state.cart.shippingMethod.value === 'express'
                  ? `Express shipping ($20.00)`
                  : `Standard shipping ($10.00)`
              }`}
            />
          </ListItem>
        </List>
      </CardContent>

      <Divider />

      <CardHeader
        title="Billing Address"
        sx={(theme) => ({
          '& 	.MuiCardHeader-title': {
            fontFamily: 'Roboto',
            fontSize: '1rem',
            color: theme.palette.common.greenBlue,
          },
        })}
      />

      <CardContent>
        <BillingAddress diff={diff} setDiff={setDiff} />
      </CardContent>

      <Divider />

      <CardHeader
        title="Payment method"
        sx={(theme) => ({
          '& 	.MuiCardHeader-title': {
            fontFamily: 'Roboto',
            fontSize: '1rem',
            color: theme.palette.common.greenBlue,
          },
        })}
      />

      <CardContent>
        <Grid container direction="column" spacing={4}>
          <Grid item>{cardWrapper}</Grid>

          <Grid item>
            <Button
              onClick={handlePay}
              fullWidth
              variant="contained"
              disabled={!clientSecret || loading}
            >
              {loading ? (
                <CircularProgress color="primary" size="1.5rem" />
              ) : (
                `Pay $${(
                  cartItems.reduce((a, c) => a + c.quantity * c.price, 0) +
                  (shippingMethod.value === 'standard' ? 10 : 20)
                ).toFixed(2)}`
              )}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
