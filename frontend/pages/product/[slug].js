import React from 'react';
import Layout from '../../components/Layout';

export default function ProductPage(props) {
  return <Layout></Layout>;
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

    var param = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();

    const res = await fetch(process.env.STRAPI_BASE + `products?slug=${param}`);
    const product = await res.json();
    console.log(product);
    return {
      props: {
        product,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
