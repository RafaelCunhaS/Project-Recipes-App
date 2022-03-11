import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import apiContext from '../context/apiContext';
import { MAX_FOOD_ARRAY } from '../MAGIC_NUMBER';

export default function RenderByIngredient() {
  const { renderByIngredient } = useContext(apiContext);
  return (
    <div>
      {renderByIngredient.slice(0, MAX_FOOD_ARRAY).map((ingredient, index) => (
        <Link
          to="/foods"
          key={ ingredient.idMeal || ingredient.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ ingredient.strMealThumb || ingredient.strDrinkThumb }
            alt="food"
            width="140"
            height="140"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            {ingredient.strMeal || ingredient.strDrink}
          </p>
        </Link>
      ))}
    </div>
  );
}
