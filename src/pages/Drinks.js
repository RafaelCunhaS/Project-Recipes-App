import React from 'react';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import Header from '../components/Header';
import Category from '../components/Category';

function Drinks() {
  return (
    <>
      <Header title="Drinks" />
      <Category />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default Drinks;
