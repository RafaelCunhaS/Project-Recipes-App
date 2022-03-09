import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import apiContext from '../context/apiContext';
import { MAX_FOOD_ARRAY } from '../MAGIC_NUMBER';

function RecipeCardsOnLoadHelper() {
  const location = useLocation();
  const { recipes } = useContext(apiContext);
  return (
    <div>
      {location.pathname === '/foods'
        ? (
          recipes.meals.slice(0, MAX_FOOD_ARRAY).map(
            ({ strMealThumb, strMeal }, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ index }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt="receita-"
                />
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </div>
            ),
          )
        ) : (
          recipes.drinks.slice(0, MAX_FOOD_ARRAY).map(
            ({ strDrinkThumb, strDrink }, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ index }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt="receita-"
                />
                <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
              </div>
            ),
          )
        )}
    </div>
  );
}

export default RecipeCardsOnLoadHelper;
