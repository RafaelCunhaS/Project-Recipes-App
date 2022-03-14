import React, { useContext } from 'react';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import Header from '../components/Header';
import Category from '../components/Category';
import RenderByIngredient from '../components/RenderByIngredient';
import apiContext from '../context/apiContext';

function Drinks() {
  const { renderByIngredient } = useContext(apiContext);
  return (
    <>
      <Header title="Drinks" />
      <Category />
      { renderByIngredient.length > 0 ? <RenderByIngredient /> : <RecipeCards /> }
      <Footer />
    </>
  );
}

export default Drinks;
