import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  Link,
  List,
  ListItem,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/store';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

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
          <Grid item>
            <Typography>Bag is empty</Typography>
          </Grid>
        ) : (
          <Grid item container justifyContent="space-evenly" spacing={5}>
            <Grid item>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Image
                                src={item.img}
                                alt={item.name}
                                width={50}
                                height={50}
                              />
                            </Link>
                          </NextLink>
                        </TableCell>

                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Typography>{item.name}</Typography>
                            </Link>
                          </NextLink>
                        </TableCell>

                        <TableCell align="right">
                          <FormControl
                            sx={{ m: 1, width: '7ch' }}
                            variant="outlined"
                          >
                            <OutlinedInput
                              error={item.error}
                              value={item.quantity}
                              onChange={handleQtyChanged(item)}
                              size="small"
                              type="number"
                              min={1}
                              step={1}
                              id="quantity"
                              aria-describedby="quantity of item"
                              sx={{
                                'input::-webkit-inner-spin-button': {
                                  '-webkit-appearance': 'none',
                                  margin: 0,
                                },

                                'input[type=number]': {
                                  '-moz-appearance': 'textfield',
                                },
                              }}
                              inputProps={{
                                'aria-label': 'quantity',
                                type: 'number',
                                min: 1,
                                step: 1,
                              }}
                            />
                          </FormControl>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={removeItemHandler(item)}
                          >
                            X
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
