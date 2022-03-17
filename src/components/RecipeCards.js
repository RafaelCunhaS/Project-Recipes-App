import React, { useContext } from 'react';
import RecipeCardsSearch from './RecipeCardsSearch';
import RecipeCardsOnLoad from './RecipeCardsOnLoad';
import apiContext from '../context/apiContext';
import './RecipesCards.css';

function RecipeCards() {
  const { apiDetails: { call } } = useContext(apiContext);
  return (
    <div>
      {call
        ? (
          <RecipeCardsSearch />
        )
        : (
          <RecipeCardsOnLoad />
        )}
    </div>
  );
}

export default RecipeCards;
