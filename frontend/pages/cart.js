import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
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

        {cartItems.length === 0 ? (
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
                          <Select value={1} size="small">
                            {[...Array(item.stock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>${item.price}</Typography>
                        </TableCell>

                        <TableCell align="right">
                          {/* <Button vairant="contained" color="secondary">
                            X
                          </Button> */}
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
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        router.push('/checkout');
                      }}
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
