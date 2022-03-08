import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RadioSearch from '../components/RadioSearch';
import RecipeCards from '../components/RecipeCards';

function Foods() {
  return (
    <>
      <Header title="Foods" />
      <RadioSearch />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default Foods;
