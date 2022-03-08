import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import apiContext from '../context/apiContext';

function RecipeCards() {
  const { recipes } = useContext(apiContext);
  if (recipes.lenght > 0) {
    const { idMeal } = recipes[0];
    return idMeal;
  }
  console.log(idMeal);
  return (
    <div>
      {
        recipes.length === 1
          ? (
            <Redirect to={ { pathname: `/foods/${idMeal}` } } />
          ) : null
      }
    </div>
  );
}

export default RecipeCards;
