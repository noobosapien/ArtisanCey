import { Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Layout from '../../components/Layout';

export default function ProductPage(props) {
  const { product } = props;

  const prodInfo = product instanceof Array && product.length ? product[0] : {};

  return (
    <Layout title={prodInfo.name} description={prodInfo.description}>
      <Grid container>
        {prodInfo.images ? (
          <Grid item>
            <Image src={prodInfo.images[0].url} width={500} height={500} />
          </Grid>
        ) : undefined}
      </Grid>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(process.env.STRAPI_BASE + `products`);
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

    const res = await fetch(process.env.STRAPI_BASE + `products?slug=${param}`);
    const product = await res.json();

    return {
      props: {
        product,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
