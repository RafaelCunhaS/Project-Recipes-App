import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DrinkIngredients from './DrinkIngredients';
import { addDrinkIngredients, removeDrinkIngredients } from '../services/localStorage';

function DrinkDetailsInProgressHelper(props) {
  const { ingredients, id, instructions } = props;
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
      {instructions.map((e, index) => (
        <p data-testid="instructions" key={ index }>{e}</p>
      ))}
      <button
        disabled={ handleButton() }
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleClick }
      >
        Finish recipe
      </button>
    </div>
  );
}

DrinkDetailsInProgressHelper.propTypes = {
  ingredients: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  instructions: PropTypes.node.isRequired,
};

export default DrinkDetailsInProgressHelper;
