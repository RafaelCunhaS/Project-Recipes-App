import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCards from '../components/RecipeCards';
import Category from '../components/Category';
import apiContext from '../context/apiContext';
import RenderByIngredient from '../components/RenderByIngredient';

function Foods() {
  const { renderByIngredient } = useContext(apiContext);
  return (
    <>
      <Header title="Foods" />
      <Category />
      {renderByIngredient.length > 0 ? <RenderByIngredient /> : (
        <RecipeCards />
      )}
      <Footer />
    </>
  );
}

export default Foods;
