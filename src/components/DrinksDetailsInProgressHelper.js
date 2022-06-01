import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DrinkIngredients from './DrinkIngredients';
import {
  addDrinkIngredients, removeDrinkIngredients, addDoneRecipe,
} from '../services/localStorage';

function DrinkDetailsInProgressHelper(props) {
  const {
    ingredients,
    instructions,
    alcoholicOrNot,
    category,
    id,
    image,
    name,
  } = props;
  // Utilizando o estado callback para renderizar esse componente sempre que o checkbox for clicado.
  const [callback, setCallback] = useState(0);
  const history = useHistory();

  const handleButton = () => {
    if ('inProgressRecipes' in localStorage) {
      const ingredientsLength = ingredients.length;
      const getIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (ingredientsLength === getIngredients.cocktails[id].length) {
        return false;
      }
      return true;
    }
    return true;
  };

  const handleClick = () => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const date = `${dia}/${mes}/${ano}`;
    addDoneRecipe({
      alcoholicOrNot,
      category,
      id,
      image,
      name,
      doneDate: date,
      tags: [],
      type: 'drink',
    });
    history.push('/done-recipes');
  };

  const saveIngredients = ({ target }) => {
    if (target.checked) {
      addDrinkIngredients(id, target.name);
      setCallback(callback + 1);
    } else {
      removeDrinkIngredients(id, target.name);
      setCallback(callback + 1);
    }
  };

  const verifyIngredient = (e) => {
    if ('inProgressRecipes' in localStorage) {
      const getIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const teste = getIngredients.cocktails[id];
      if (teste.find((value) => value === e)) {
        return true;
      }
      return false;
    }
  };

  useEffect(() => {
  }, [callback]);

  return (
    <div>
      <div className="details-card">
        <div className="progress-card">
          {ingredients.map((e, index) => (
            <DrinkIngredients
              checked={ verifyIngredient(e) }
              saveIngredients={ saveIngredients }
              key={ index }
              ingredients={ e }
              id={ id }
              index={ index }
            />
          ))}
        </div>
      </div>
      <h2>Instructions</h2>
      <div className="details-card">
        {instructions.map((e, index) => (
          <p
            className="progress-card progress-p"
            data-testid="instructions"
            key={ index }
          >
            {e}
          </p>
        ))}
      </div>
      <button
        disabled={ handleButton() }
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleClick }
        className="buttons"
      >
        Finish recipe
      </button>
    </div>
  );
}

DrinkDetailsInProgressHelper.propTypes = {
  ingredients: PropTypes.node,
  id: PropTypes.string,
  instructions: PropTypes.node,
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default DrinkDetailsInProgressHelper;
