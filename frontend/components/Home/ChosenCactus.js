import React from 'react';
import CactusCard from '../common/CactusCard';

export default function ChosenCactus({ number, products }) {
  const chosen = number % products.length;

  return (
    <>
      <CactusCard product={products[chosen]} />{' '}
    </>
  );
}
