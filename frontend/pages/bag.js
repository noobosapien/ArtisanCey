import { Button, Card, Grid, List, ListItem, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/store';
import dynamic from 'next/dynamic';
import BaggedItem from '../components/Bag/BaggedItem';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

function Cart() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => (e) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const handleQtyChanged = (item) => (e) => {
    if (Number(e.target.value) < 1) {
      item.quantity = Number(1);
      dispatch({ type: 'CART_EDIT_ITEM', payload: item });
      return;
    } else {
      item.quantity = Number(e.target.value);
      dispatch({ type: 'CART_EDIT_ITEM', payload: item });
    }
  };

  const handleCheckout = (e) => {
    const errors = cartItems.filter((item) => item.error === true);
    if (errors.length) {
      console.log(errors);
      return;
    }

    router.push('/checkout');
  };

  return (
    <Layout>
      <Grid
        sx={{ marginTop: '1rem' }}
        spacing={10}
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Typography component="h1" variant="h3">
            Shopping Bag
          </Typography>
        </Grid>

        {cartItems instanceof Array && cartItems.length === 0 ? (
          <>
            <Grid item>
              <Typography>Your bag is currently empty</Typography>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                endIcon={<SentimentSatisfiedAltIcon />}
                onClick={(e) => router.push('/')}
              >
                get some items
              </Button>
            </Grid>
          </>
        ) : (
          <Grid
            item
            container
            justifyContent="space-evenly"
            alignItems="center"
            spacing={5}
          >
            <Grid item alignItems="space-evenly">
              <Grid item container direction="column" spacing={5}>
                {cartItems.map((item) => (
                  <Grid item>
                    <BaggedItem
                      item={item}
                      removeItemHandler={removeItemHandler(item)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item>
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h6">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}){' '}
                      items : $
                      {cartItems
                        .reduce((a, c) => a + c.quantity * c.price, 0)
                        .toFixed(2)}
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleCheckout}
                    >
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
