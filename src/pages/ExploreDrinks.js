import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explore Drinks" renderSearch={ false } />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
