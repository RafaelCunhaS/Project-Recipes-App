import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addFoodIngredients, removeFoodIngredients } from '../services/localStorage';

function FoodIngredients(props) {
  const [checked, setChecked] = useState(true);
  const { ingredients, id, index } = props;
  const saveIngredients = ({ target }) => {
    if (target.checked) {
      addFoodIngredients(id, ingredients);
      if ('inProgressRecipes' in localStorage) {
        const getIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
        const teste = getIngredients.meals[id].find((e) => e === ingredients);
        if (teste !== undefined) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      }
    } else {
      setChecked(false);
      removeFoodIngredients(id, ingredients);
    }
  };

  useEffect(() => {
    if ('inProgressRecipes' in localStorage) {
      const getIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (getIngredients.meals[id]) {
        const teste = getIngredients.meals[id].find((e) => e === ingredients);
        if (teste !== undefined) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      }
    } else {
      setChecked(false);
    }
  }, []);

  return (
    <div>
      <label data-testid={ `${index}-ingredient-step` } htmlFor="ingredients">
        { ingredients }
        <input
          checked={ checked }
          onChange={ saveIngredients }
          type="checkbox"
        />
      </label>
    </div>
  );
}

FoodIngredients.propTypes = {
  ingredients: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FoodIngredients;
