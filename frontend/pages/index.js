import { Grid } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Adornment from '../components/Home/Adornment';
import Hero from '../components/Home/Hero';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout
      title="Artisan Cey"
      description={'Artisan Cey hand crafted and delivered'}
    >
      <Hero />
      <Adornment />
    </Layout>
  );
}
