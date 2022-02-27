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
import DirectionsBoatFilledTwoToneIcon from '@mui/icons-material/DirectionsBoatFilledTwoTone';

export default function Checkout() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [shipping, setShipping] = useState('');

  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    setShipping(state.cart.shippingMethod.value);
  }, []);

  const handleShipping = (e) => {
    setShipping(e.target.value);
    dispatch({
      type: 'SAVE_SHIPMENT_METHOD',
      payload: { value: e.target.value },
    });
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
            <ShowBaggedItems shipping={shipping} />
          </Box>
        </Grid>

        <Grid item>
          <CheckoutWizard activeStep={2} />
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
                  <Button fullWidth variant="contained">
                    {`Pay $${(
                      cartItems.reduce((a, c) => a + c.quantity * c.price, 0) +
                      (shipping === 'standard' ? 10 : 20)
                    ).toFixed(2)}`}
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <SideCart shipping={shipping} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
