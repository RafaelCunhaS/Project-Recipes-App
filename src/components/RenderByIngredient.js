import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import apiContext from '../context/apiContext';

export default function RenderByIngredient() {
  const { renderByIngredient } = useContext(apiContext);
  return (
    <div>
      {renderByIngredient.map((ingredient) => (
        <Link to="/foods" key={ ingredient.idMeal || ingredient.idDrink }>
          <img
            src={ ingredient.strMealThumb || ingredient.strDrinkThumb }
            alt="food"
            width="140"
            height="140"
          />
          <p>{ingredient.strMeal || ingredient.strDrink}</p>
        </Link>
      ))}
    </div>
  );
}
