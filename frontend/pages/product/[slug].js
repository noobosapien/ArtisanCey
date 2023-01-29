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
import Example from '../../public/example.png';
import { Box } from '@mui/material';

export default function ProductPage(props) {
  return (
    <Layout>
      <Grid
        container
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ marginTop: '4rem' }}
        spacing={10}
      >
        <Grid item>
          {/* <Image src={Example} layout="intrinsic" /> */}
          <Card sx={{ borderRadius: '0rem', maxWidth: '25rem' }}>
            {/* <CardContent> */}
            <CardMedia
              component="img"
              height="auto"
              image={Example.src}
              alt="example"
            />
            {/* </CardContent> */}
          </Card>
        </Grid>

        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h3">Name</Typography>
            </Grid>
            <Grid item>
              <Typography>description</Typography>
            </Grid>

            <Grid item>
              <Typography sx={{ fontSize: '2rem' }}>$9.99</Typography>
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
                variant="outlined"
                sx={{ paddingLeft: '10rem', paddingRight: '10rem' }}
              >
                Get it now
              </Button>
            </Box>
          </Grid>
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
          <Button fullWidth variant="contained" color="secondary">
            Get it now
          </Button>
        </Toolbar>
      </AppBar>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    // const res = await fetch(process.env.STRAPI_BASE + `products`);
    // const products = await res.json();

    const names = ['/product/example'];
    // products.forEach((prod) => {
    //   names.push('/product/' + prod.slug); //This has the first letter capital
    // });

    return {
      paths: names,
      fallback: true,
    };
  } catch (e) {}
}

export async function getStaticProps(context) {
  try {
    // const { params } = context;
    // const { slug } = params;

    // var param = slug.toLowerCase();

    // const res = await fetch(process.env.STRAPI_BASE + `products?slug=${param}`);
    // const product = await res.json();

    return {
      props: {
        // product,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
