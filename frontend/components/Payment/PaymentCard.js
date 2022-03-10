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
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from '../../utils/store';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { v4 as uuidv4 } from 'uuid';
import { processOrder } from '../../helpers/processOrder';
import { placeOrder } from '../../helpers/placeOrder';
import countries from '../../utils/countries';
import BillingAddress from './BillingAddress';
import Cookies from 'js-cookie';

export default function PaymentCard({ loading, setLoading }) {
  const { state, dispatch } = useContext(Store);
  const [clientSecret, setClientSecret] = useState(null);
  const [cardValid, setCardValid] = useState(false);
  const [diff, setDiff] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [countryValid, setCountryValid] = useState(true);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  function reducer(state, action) {
    switch (action.type) {
      case 'FIRSTNAME_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            firstName: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          firstName: { error: false, value: action.payload, valid },
        };
      }

      case 'LASTNAME_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            lastName: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          lastName: { error: false, value: action.payload, valid },
        };
      }

      case 'ADDRESS_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            address: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          address: { error: false, value: action.payload, valid },
        };
      }

      case 'APARTMENT_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            apartment: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          apartment: { error: false, value: action.payload, valid },
        };
      }

      case 'REGION_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            region: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          region: { error: false, value: action.payload, valid },
        };
      }

      case 'CITY_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            city: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          city: { error: false, value: action.payload, valid },
        };
      }

      case 'ZIPCODE_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            zipCode: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          zipCode: { error: false, value: action.payload, valid },
        };
      }

      case 'PHONE_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            phone: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          phone: { error: false, value: action.payload, valid },
        };
      }

      case 'FIRSTNAME_INVALID': {
        return {
          ...state,
          firstName: { ...state.firstName, error: true },
        };
      }

      case 'LASTNAME_INVALID': {
        return {
          ...state,
          lastName: { ...state.lastName, error: true },
        };
      }

      case 'ADDRESS_INVALID': {
        return {
          ...state,
          address: { ...state.address, error: true },
        };
      }

      case 'APARTMENT_INVALID': {
        return {
          ...state,
          apartment: { ...state.apartment, error: true },
        };
      }

      case 'REGION_INVALID': {
        return {
          ...state,
          region: { ...state.region, error: true },
        };
      }

      case 'CITY_INVALID': {
        return {
          ...state,
          city: { ...state.city, error: true },
        };
      }

      case 'ZIPCODE_INVALID': {
        return {
          ...state,
          zipCode: { ...state.zipCode, error: true },
        };
      }

      case 'PHONE_INVALID': {
        return {
          ...state,
          phone: { ...state.phone, error: true },
        };
      }

      default:
        return state;
    }
  }

  const [stateInfo, dispatchInfo] = useReducer(reducer, {
    firstName: state.cart.billingAddress
      ? state.cart.billingAddress.firstName
      : '',
    lastName: state.cart.billingAddress
      ? state.cart.billingAddress.lastName
      : '',
    address: state.cart.billingAddress ? state.cart.billingAddress.address : '',
    apartment: state.cart.billingAddress
      ? state.cart.billingAddress.apartment
      : '',
    city: state.cart.billingAddress ? state.cart.billingAddress.city : '',
    region: state.cart.billingAddress ? state.cart.billingAddress.region : '',
    zipCode: state.cart.billingAddress ? state.cart.billingAddress.zipCode : '',
    phone: state.cart.billingAddress ? state.cart.billingAddress.phone : '',
  });

  const {
    cart: {
      cartItems,
      shippingAddress,
      shippingCountry,
      billingAddress,
      billingCountry,
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

    var errors = false;

    const keys = Object.keys(stateInfo);

    for (var i = 0; i < keys.length; i++) {
      if (!stateInfo[keys[i]].valid) {
        errors = true;
        break;
      }
    }

    if (countryCode === undefined || countryCode === '') {
      errors = true;
      setCountryValid(false);
    } else {
      setCountryValid(true);
    }

    if (errors && diff) {
      if (!stateInfo.firstName.valid) {
        dispatchInfo({ type: 'FIRSTNAME_INVALID' });
      }

      if (!stateInfo.lastName.valid) {
        dispatchInfo({ type: 'LASTNAME_INVALID' });
      }

      if (!stateInfo.address.valid) {
        dispatchInfo({ type: 'ADDRESS_INVALID' });
      }

      if (!stateInfo.city.valid) {
        dispatchInfo({ type: 'CITY_INVALID' });
      }

      if (!stateInfo.region.valid) {
        dispatchInfo({ type: 'REGION_INVALID' });
      }

      if (!stateInfo.zipCode.valid) {
        dispatchInfo({ type: 'ZIPCODE_INVALID' });
      }

      if (!stateInfo.phone.valid) {
        dispatchInfo({ type: 'PHONE_INVALID' });
      }

      return;
    }

    const idempotencyKey = uuidv4();

    const cardElement = elements.getElement(CardElement);

    if (cardValid) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    var result;

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
          billingCountry,
          shippingOption: {
            label: state.cart.shippingMethod && state.cart.shippingMethod.value,
            price:
              state.cart.shippingMethod &&
              state.cart.shippingMethod.value === 'express'
                ? 20
                : 10,
          },
          shippingAddress,
          billingAddress: diff ? billingAddress : shippingAddress,
          orderId: clientSecret,
        });

        if (order.message === 'success') {
          console.log(order.auth);
          dispatch({ type: 'CART_CLEAR' });

          router.push(`/order/${order.link}?auth=${order.auth}`);
        }
      } catch (e) {
        console.log(e);
      }
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
        <BillingAddress
          diff={diff}
          setDiff={setDiff}
          stateInfo={stateInfo}
          dispatchInfo={dispatchInfo}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          countryValid={countryValid}
          setCountryValid={setCountryValid}
        />
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
