import { Grid, Stack } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import Adornment from '../components/Home/Adornment';
import Carousel from '../components/Home/Carousel';
import CategoryMenu from '../components/Home/CategoryMenu';
import Hero from '../components/Home/Hero';
import LatestProducts from '../components/Home/LatestProducts';
import Satisfaction from '../components/Home/Satisfaction';
import Layout from '../components/Layout';
import { setDebug } from '../helpers/setDebug';
import styles from '../styles/Home.module.css';

export default function Home({ featured }) {
  useEffect(() => {
    const sendDebug = async () => {
      try {
        setDebug({
          isMobile:
            window && window.navigator
              ? window.navigator.userAgentData?.mobile
              : '',
        });
      } catch (e) {
        console.log(e);
      }
    };

    sendDebug();
  }, []);

  return (
    <Layout
      title="Artisan Cey"
      description={'Artisan Cey hand crafted and delivered'}
    >
      <Hero />
      {/* <Carousel products={featured} /> */}
      {/* <LatestProducts />
      <Satisfaction /> */}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(process.env.STRAPI_BASE + 'products?featured=true');
    const featured = await res.json();

    return {
      props: {
        featured,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
