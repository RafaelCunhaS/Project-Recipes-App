import React from 'react';
import Footer from '../components/Footer';
import RadioSearch from '../components/RadioSearch';
import RecipeCards from '../components/RecipeCards';
import Header from '../components/Header';
import Category from '../components/Category';

function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <RadioSearch />
      <Category />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default Drinks;
