import React from 'react';
import Footer from '../components/Footer';
import RadioSearch from '../components/RadioSearch';
import RecipeCards from '../components/RecipeCards';
import Header from '../components/Header';

function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <RadioSearch />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default Drinks;
