import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';

export default function ProductPage(props) {
  return <Layout></Layout>;
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
