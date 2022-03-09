import React, { useContext, useEffect, useState } from 'react';
import apiContext from '../context/apiContext';
import RecipeCardsHelper from './RecipeCardsHelper';

function RecipeCardsOnLoad() {
  const { apiDetails: { category } } = useContext(apiContext);
  const [recipes, setRecipes] = useState([]);
  const getRecipes = async () => {
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((dataResponse) => setRecipes(dataResponse));
  };
  console.log(recipes);
  useEffect(() => {
    if (category !== '') {
      getRecipes();
    }
  }, []);

  return (
    <RecipeCardsHelper />
  );
}

export default RecipeCardsOnLoad;
