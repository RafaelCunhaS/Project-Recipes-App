import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addDrinkIngredients, removeDrinkIngredients } from '../services/localStorage';

function DrinkIngredients(props) {
  const [checked, setChecked] = useState(true);
  const { ingredients, id, index } = props;
  console.log(id);
  const saveIngredients = ({ target }) => {
    if (target.checked) {
      addDrinkIngredients(id, ingredients);
      if ('inProgressRecipes' in localStorage) {
        const getIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
        const teste = getIngredients.cocktails[id].find((e) => e === ingredients);
        if (teste !== undefined) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      }
    } else {
      setChecked(false);
      removeDrinkIngredients(id, ingredients);
    }
  };

  useEffect(() => {
    if ('inProgressRecipes' in localStorage) {
      const getIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (getIngredients.drinks[id]) {
        const teste = getIngredients.cocktails[id].find((e) => e === ingredients);
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

DrinkIngredients.propTypes = {
  ingredients: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkIngredients;
