import { Grid, Stack } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Adornment from '../components/Home/Adornment';
import Carousel from '../components/Home/Carousel';
import CategoryMenu from '../components/Home/CategoryMenu';
import Hero from '../components/Home/Hero';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home({ featured }) {
  return (
    <Layout
      title="Artisan Cey"
      description={'Artisan Cey hand crafted and delivered'}
    >
      <Hero />
      <Adornment />
      <Carousel products={featured} />
      <CategoryMenu />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://cms.artisancey.com/products?featured=true');
  const featured = await res.json();

  return {
    props: {
      featured,
    },
  };
}
