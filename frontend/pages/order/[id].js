import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';

function Order({ params }) {
  console.log(params.id);
  return <Layout></Layout>;
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
