import { Grid } from '@mui/material';
import React from 'react';
import ProductCard from '../../components/common/ProductCard';
import Layout from '../../components/Layout';

export default function Category(props) {
  const { category } = props;

  const products =
    category instanceof Array && category.length ? category[0].products : [];

  return (
    <Layout
      title="Artisan Cey"
      description={'Artisan Cey hand crafted and delivered'}
    >
      <Grid container justifyContent="space-evenly" spacing={10}>
        {products.map((prod) => {
          return (
            <Grid item key={prod.id}>
              <ProductCard product={prod} />
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(process.env.STRAPI_BASE + `categories`);
    const categories = await res.json();

    const names = [];
    categories.forEach((cat) => {
      names.push('/category/' + cat.name); //This has the first letter capital
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
    const { id } = params;

    var param = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();

    const res = await fetch(
      process.env.STRAPI_BASE + `categories?name=${param}`
    );
    const category = await res.json();

    return {
      props: {
        category,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
