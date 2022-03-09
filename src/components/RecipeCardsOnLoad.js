import React, { useContext } from 'react';
import RecipeCardsOnLoadHelper from './RecipeCardsOnLoadHelper';
import RecipeCardsHelper from './RecipeCardsHelper';
import apiContext from '../context/apiContext';

function RecipeCardsOnLoad() {
  const { recipes } = useContext(apiContext);
  return (
    <div>
      {
        recipes.length === 0
          ? (
            <RecipeCardsHelper />
          )
          : (
            <RecipeCardsOnLoadHelper />
          )
      }
    </div>
  );
}

export default RecipeCardsOnLoad;
