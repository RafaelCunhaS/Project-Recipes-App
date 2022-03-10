import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCards from '../components/RecipeCards';

function Foods() {
  return (
    <>
      <Header title="Foods" />
      <RecipeCards />
      <Footer />
    </>
  );
}

export default Foods;
