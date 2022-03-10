import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiContext from '../context/apiContext';
import { MAX_FOOD_ARRAY } from '../MAGIC_NUMBER';

function RecipeCardsHelper() {
  const [recipes, setRecipes] = useState();
  const { apiDetails: { path } } = useContext(apiContext);
  const location = useLocation();

  const getData = async () => {
    if (location.pathname === '/foods') {
      await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((dataResponse) => setRecipes(dataResponse));
    } else if (location.pathname === '/drinks') {
      await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((dataResponse) => setRecipes(dataResponse));
    }
  };

  if (recipes !== undefined && location.pathname === '/foods') {
    localStorage.setItem('Meals', JSON.stringify(recipes));
  }

  if (recipes !== undefined && location.pathname === '/drinks') {
    localStorage.setItem('Drinks', JSON.stringify(recipes));
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <div>
      {recipes !== undefined && Object.keys(recipes)[0] === 'meals'
        ? (
          recipes.meals.slice(0, MAX_FOOD_ARRAY)
            .map(({ idMeal, strMealThumb, strMeal }, index) => (
              <section
                key={ idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <Link
                  to={ `/foods/${idMeal}` }
                >
                  <img
                    src={ strMealThumb }
                    alt="cardRecipe"
                    data-testid={ `${index}-card-img` }
                  />
                </Link>
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </section>
            ))
        ) : null }

      {recipes !== undefined && Object.keys(recipes)[0] === 'drinks'
        ? (
          recipes.drinks.slice(0, MAX_FOOD_ARRAY)
            .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
              <section
                key={ idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <Link
                  to={ `/drinks/${idDrink}` }
                >
                  <img
                    src={ strDrinkThumb }
                    alt="cardRecipe"
                    data-testid={ `${index}-card-img` }
                  />
                </Link>
                <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
              </section>
            ))
        ) : null }
    </div>
  );
}

export default RecipeCardsHelper;
