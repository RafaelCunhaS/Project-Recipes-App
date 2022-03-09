import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RadioSearch from '../components/RadioSearch';
import RecipeCards from '../components/RecipeCards';
import Category from '../components/Category';

function Foods() {
  return (
    <>
      <Header title="Foods" />
      <RadioSearch />
      <Category />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default Foods;
