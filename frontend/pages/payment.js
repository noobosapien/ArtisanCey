import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/store';
import CheckoutWizard from '../components/Checkout/CheckoutWizard';
import { useRouter } from 'next/router';
import ShowBaggedItems from '../components/Checkout/ShowBaggedItems';
import { Box } from '@mui/system';
import SideCart from '../components/Checkout/SideCart';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentCard from '../components/Payment/PaymentCard';

const stripePromise = loadStripe(
  process.env.STRIPE_PK ||
    'pk_live_51KZWxzCO54trWcxUUi780flRPxcdmmp0fUWLD5SxVLd1k9XOsDNktTph9r451GNRvI5Gd8TPQKgw0hYicAaOENpG00YGJ2lMJZ'
);

export default function Checkout() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [shipping, setShipping] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    cart: { cartItems, shippingAddress, shippingCountry, shippingMethod },
  } = state;

  useEffect(() => {
    setShipping(shippingMethod.value);
  }, []);

  useEffect(() => {
    if (!loading) {
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

      if (shippingMethod.value === '') {
        router.push('/shipping');
      }
    }
  }, [cartItems, shippingAddress, shippingCountry, shippingMethod, loading]);

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
              <Elements stripe={stripePromise}>
                <PaymentCard loading={loading} setLoading={setLoading} />
              </Elements>
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
