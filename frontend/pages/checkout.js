import {
  Grid,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Box,
} from '@mui/material';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Layout from '../components/Layout';

import { Store } from '../utils/store';
import CheckoutWizard from '../components/Checkout/CheckoutWizard';
import { useRouter } from 'next/router';
import SelectCountry from '../components/Checkout/SelectCountry';
import SelectAddress from '../components/Checkout/SelectAddress';
import ShowBaggedItems from '../components/Checkout/ShowBaggedItems';
import SideCart from '../components/Checkout/SideCart';

export default function Checkout() {
  const { state, dispatch } = useContext(Store);

  function reducer(state, action) {
    switch (action.type) {
      case 'EMAIL_CHANGE': {
        const valid =
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            action.payload
          );

        dispatch({
          type: 'SAVE_SHIPPING_ADDRESS',
          payload: {
            ...state,
            email: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          email: { error: false, value: action.payload, valid },
        };
      }

      case 'FIRSTNAME_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_SHIPPING_ADDRESS',
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
          type: 'SAVE_SHIPPING_ADDRESS',
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
          type: 'SAVE_SHIPPING_ADDRESS',
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
          type: 'SAVE_SHIPPING_ADDRESS',
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
          type: 'SAVE_SHIPPING_ADDRESS',
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
          type: 'SAVE_SHIPPING_ADDRESS',
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
          type: 'SAVE_SHIPPING_ADDRESS',
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
          type: 'SAVE_SHIPPING_ADDRESS',
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

      case 'EMAIL_INVALID': {
        return {
          ...state,
          email: { ...state.email, error: true },
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
    email: state.cart.shippingAddress ? state.cart.shippingAddress.email : '',
    firstName: state.cart.shippingAddress
      ? state.cart.shippingAddress.firstName
      : '',
    lastName: state.cart.shippingAddress
      ? state.cart.shippingAddress.lastName
      : '',
    address: state.cart.shippingAddress
      ? state.cart.shippingAddress.address
      : '',
    apartment: state.cart.shippingAddress
      ? state.cart.shippingAddress.apartment
      : '',
    city: state.cart.shippingAddress ? state.cart.shippingAddress.city : '',
    region: state.cart.shippingAddress ? state.cart.shippingAddress.region : '',
    zipCode: state.cart.shippingAddress
      ? state.cart.shippingAddress.zipCode
      : '',
    phone: state.cart.shippingAddress ? state.cart.shippingAddress.phone : '',
  });

  const router = useRouter();

  const [countryCode, setCountryCode] = useState('');
  const [countryValid, setCountryValid] = useState(true);

  useEffect(() => {
    state.cart.shippingCountry &&
      state.cart.shippingCountry.value &&
      setCountryCode(state.cart.shippingCountry.value);
  }, []);

  useEffect(() => {
    dispatch({
      type: 'SAVE_SHIPPING_COUNTRY',
      payload: { value: countryCode },
    });
  }, [countryCode]);

  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    if (cartItems.length < 1) {
      router.push('/bag');
    }
  }, [cartItems]);

  const handleContinue = (e) => {
    e.preventDefault();
    var errors = false;

    const keys = Object.keys(stateInfo);

    for (var i = 0; i < keys.length; i++) {
      if (!stateInfo[keys[i]].valid) {
        errors = true;
        console.log(stateInfo[keys[i]], keys[i]);
        break;
      }
    }

    if (countryCode === undefined || countryCode === '') {
      errors = true;
      setCountryValid(false);
    } else {
      setCountryValid(true);
    }

    console.log(errors);
    if (!errors) return router.push('/shipping');

    if (!stateInfo.email.valid) {
      dispatchInfo({ type: 'EMAIL_INVALID' });
    }

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
  };

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="space-evenly"
        direction="column"
        spacing={4}
      >
        <Grid item>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <ShowBaggedItems />
          </Box>
        </Grid>

        <Grid item>
          <CheckoutWizard />
        </Grid>

        <Grid item>
          <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid item xs={12} md={5} lg={4}>
              <Card variant="outlined" sx={{ border: 0 }}>
                <CardHeader
                  title="Contact information"
                  sx={(theme) => ({
                    '& 	.MuiCardHeader-title': {
                      fontFamily: 'Roboto',
                      fontSize: '1rem',
                      color: theme.palette.common.greenBlue,
                    },
                  })}
                />

                <CardContent>
                  <TextField
                    fullWidth
                    size="small"
                    required
                    type={'email'}
                    value={stateInfo.email.value}
                    label="Email"
                    error={stateInfo.email.error}
                    onChange={(e) => {
                      dispatchInfo({
                        type: 'EMAIL_CHANGE',
                        payload: e.target.value,
                      });
                    }}
                  />
                </CardContent>

                <CardHeader
                  title="Shipping address"
                  sx={(theme) => ({
                    '& 	.MuiCardHeader-title': {
                      fontFamily: 'Roboto',
                      fontSize: '1rem',
                      color: theme.palette.common.greenBlue,
                    },
                  })}
                />

                <CardContent>
                  <form>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        {!countryValid ? (
                          <Typography sx={{ color: 'red' }}>
                            Country*
                          </Typography>
                        ) : (
                          <Typography>Country*</Typography>
                        )}{' '}
                        {'  '}
                        <SelectCountry
                          setCountryValid={setCountryValid}
                          setCountry={setCountryCode}
                          countryCode={countryCode}
                        />
                      </Grid>

                      <Grid
                        item
                        container
                        justifyContent="space-between"
                        spacing={2}
                      >
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            label="First name"
                            fullWidth
                            size="small"
                            error={stateInfo.firstName.error}
                            value={stateInfo.firstName.value}
                            onChange={(e) => {
                              dispatchInfo({
                                type: 'FIRSTNAME_CHANGE',
                                payload: e.target.value,
                              });
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            label="Last name"
                            fullWidth
                            size="small"
                            error={stateInfo.lastName.error}
                            value={stateInfo.lastName.value}
                            onChange={(e) => {
                              dispatchInfo({
                                type: 'LASTNAME_CHANGE',
                                payload: e.target.value,
                              });
                            }}
                          />
                        </Grid>
                      </Grid>

                      <Grid item>
                        <SelectAddress
                          countryCode={countryCode}
                          stateInfo={stateInfo}
                          dispatchInfo={dispatchInfo}
                        />
                      </Grid>

                      <Grid item>
                        <TextField
                          required
                          label="Phone"
                          error={stateInfo.phone.error}
                          value={stateInfo.phone.value}
                          onChange={(e) => {
                            dispatchInfo({
                              type: 'PHONE_CHANGE',
                              payload: e.target.value,
                            });
                          }}
                          fullWidth
                          size="small"
                        />
                      </Grid>

                      <Grid item>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          onClick={handleContinue}
                        >
                          Continue to shipping
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <SideCart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
