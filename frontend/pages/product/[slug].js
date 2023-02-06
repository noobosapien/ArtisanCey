import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import { Box } from '@mui/material';
import ProductCarousel from '../../components/Product/ProductCarousel';
import InfoTable from '../../components/Product/InfoTable';
import { Store } from '../../utils/store';
import Message from '../../components/common/Message';

export default function ProductPage({ product }) {
  const { state, dispatch } = useContext(Store);
  const [openMessage, setOpenMessage] = useState(false);

  const handleAddToCart = async (e) => {
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });

    setOpenMessage(true);
  };

  return (
    <Layout>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ marginTop: '4rem' }}
        spacing={10}
      >
        <Grid item md={5}>
          <ProductCarousel product={product} />
        </Grid>

        <Grid item md={5}>
          <Grid container direction="column" alignItems="center" spacing={5}>
            <Grid item>
              <Typography variant="h3">{product.name}</Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{ padding: '2rem', fontSize: '1rem' }}
                textAlign="center"
              >
                {product.description}
              </Typography>
            </Grid>

            <Grid item>
              <InfoTable product={product} />
            </Grid>

            <Grid item>
              <Typography sx={{ fontSize: '2rem' }}>
                NZ${product.price}
              </Typography>
            </Grid>

            <Box
              component={Grid}
              item
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              })}
            >
              <Button
                variant="contained"
                sx={{ paddingLeft: '10rem', paddingRight: '10rem' }}
                onClick={handleAddToCart}
              >
                Get it now
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid item>
          <Message
            text={`Added ${product.name} to the bag!`}
            severity="success"
            open={openMessage}
            setOpen={setOpenMessage}
          />
        </Grid>
      </Grid>

      <AppBar
        position="fixed"
        color="primary"
        sx={(theme) => ({
          top: 'auto',
          bottom: 0,
          [theme.breakpoints.up('sm')]: { display: 'none' },
        })}
      >
        <Toolbar>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleAddToCart}
          >
            Get it now
          </Button>
        </Toolbar>
      </AppBar>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(process.env.STRAPI_BASE + `artisanceyproducts`);
    const products = await res.json();

    const names = [];
    products.forEach((prod) => {
      names.push('/product/' + prod.slug); //This has the first letter capital
    });

    return {
      paths: names,
      fallback: true,
    };
  } catch (e) {}
}

export async function getStaticProps(context) {
  try {
    const { params } = context;
    const { slug } = params;

    var param = slug.toLowerCase();

    const res = await fetch(
      process.env.STRAPI_BASE + `artisanceyproducts?slug=${param}`
    );
    const product = await res.json();

    return {
      props: {
        product: product instanceof Array ? product[0] : {},
      },
    };
  } catch (e) {
    console.log(e);
  }
}
