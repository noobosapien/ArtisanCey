import {
  Grid,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  FormControl,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/store';
import CheckoutWizard from '../components/Checkout/CheckoutWizard';
import { useRouter } from 'next/router';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ShowBaggedItems from '../components/Checkout/ShowBaggedItems';
import { Box } from '@mui/system';
import SideCart from '../components/Checkout/SideCart';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeIcon from '@mui/icons-material/Home';
import Message from '../components/common/Message';

export default function Checkout() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [shipping, setShipping] = useState('');
  const [openMessage, setOpenMessage] = useState(false);

  const {
    cart: { cartItems, shippingAddress, shippingCountry },
  } = state;

  useEffect(() => {
    state.cart.shippingMethod &&
      state.cart.shippingMethod.value &&
      setShipping(state.cart.shippingMethod.value);
  }, [state.cart.shippingMethod]);

  useEffect(() => {
    if (cartItems.length < 1) {
      router.push('/bag');
    }

    const keys = Object.keys(shippingAddress);

    for (var i = 0; i < keys.length; i++) {
      if (!shippingAddress[keys[i]].valid) {
        router.push('/checkout');
      }
    }

    if (shippingCountry.value === '') {
      router.push('/checkout');
    }
  }, [cartItems, shippingAddress, shippingCountry]);

  const handleShipping = (e) => {
    setShipping(e.target.value);
    dispatch({
      type: 'SAVE_SHIPMENT_METHOD',
      payload: { value: e.target.value },
    });
  };

  const handleContinue = (e) => {
    if (shipping === '') {
      return setOpenMessage(true);
    }

    router.push('/payment');
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
          <Message
            text={'Please select a shipping method'}
            severity="error"
            setOpen={setOpenMessage}
            open={openMessage}
          />
        </Grid>

        <Grid item>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <ShowBaggedItems shipping={shipping} />
          </Box>
        </Grid>

        <Grid item>
          <CheckoutWizard activeStep={1} />
        </Grid>

        <Grid item>
          <Grid container alignItems="center" justifyContent="space-evenly">
            <Grid item xs={12} md={5} lg={4}>
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
                  </List>
                </CardContent>

                <Divider />

                <CardHeader
                  title="Shipping method"
                  sx={(theme) => ({
                    '& 	.MuiCardHeader-title': {
                      fontFamily: 'Roboto',
                      fontSize: '1rem',
                      color: theme.palette.common.greenBlue,
                    },
                  })}
                />

                <CardContent>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="choose_shipping_method"
                      name="choose_shipping_method"
                      value={shipping}
                      onChange={handleShipping}
                    >
                      <FormControlLabel
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '1rem',
                          },
                        }}
                        value="standard"
                        control={<Radio />}
                        label="Standard shipping $5.00"
                      />

                      <div style={{ margin: '1rem' }} />
                      <FormControlLabel
                        value="express"
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '1rem',
                          },
                        }}
                        control={<Radio />}
                        label="Express shipping $20.00"
                      />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <SideCart shipping={shipping} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item alignSelf="center">
          <Button
            endIcon={<CelebrationIcon sx={{ color: '#ffff00' }} />}
            variant="contained"
            onClick={handleContinue}
          >
            One more step
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}
