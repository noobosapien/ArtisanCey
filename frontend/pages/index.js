import { useEffect } from 'react';
import Hero from '../components/Home/Hero';
import Layout from '../components/Layout';
import { setDebug } from '../helpers/setDebug';
import styles from '../styles/Home.module.css';
import Choose from '../components/Home/Choose';
import Quiz from '../components/Home/Quiz';

export default function Home({ products }) {
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
      <Choose products={products} />
      <Quiz products={products} />
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(process.env.STRAPI_BASE + 'artisanceyproducts');
    const products = await res.json();

    return {
      props: {
        products,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
