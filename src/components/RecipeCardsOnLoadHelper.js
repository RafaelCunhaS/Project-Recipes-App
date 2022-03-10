import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
            ({ strMealThumb, strMeal, idMeal }, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
                <Link
                  to={ `/foods/${idMeal}` }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt="receita-"
                  />
                </Link>
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </div>
            ),
          )
        ) : (
          recipes.drinks.slice(0, MAX_FOOD_ARRAY).map(
            ({ strDrinkThumb, strDrink, idDrink }, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
                <Link
                  to={ `/drinks/${idDrink}` }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt="receita-"
                  />
                </Link>
                <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
              </div>
            ),
          )
        )}
    </div>
  );
}

export default RecipeCardsOnLoadHelper;
