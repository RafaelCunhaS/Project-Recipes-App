import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FoodIngredients from './FoodIngredients';
import {
  addFoodIngredients, removeFoodIngredients, addDoneRecipe,
} from '../services/localStorage';

function FoodDetailsInProgressHelper(props) {
  const { ingredients,
    instructions,
    category,
    id,
    image,
    name,
    nationality,
    tag,
  } = props;
  // Utilizando o estado callback para renderizar esse componente sempre que o checkbox for clicado.
  const [callback, setCallback] = useState(0);
  const history = useHistory();

  const handleButton = () => {
    if ('inProgressRecipes' in localStorage) {
      const ingredientsLength = ingredients.length;
      const getIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (ingredientsLength === getIngredients.meals[id].length) {
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
    if (tag !== null) {
      const tagArray = tag.split(',');
      addDoneRecipe({
        category,
        id,
        image,
        name,
        nationality,
        doneDate: date,
        tags: tagArray,
        type: 'food',
      });
    } else {
      addDoneRecipe({
        category,
        id,
        image,
        name,
        nationality,
        doneDate: date,
        tags: [],
        type: 'food',
      });
    }
    history.push('/done-recipes');
  };

  const saveIngredients = ({ target }) => {
    if (target.checked) {
      addFoodIngredients(id, target.name);
      setCallback(callback + 1);
    } else {
      removeFoodIngredients(id, target.name);
      setCallback(callback + 1);
    }
  };

  const verifyIngredient = (e) => {
    if ('inProgressRecipes' in localStorage) {
      const getIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const teste = getIngredients.meals[id];
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
        <FoodIngredients
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

FoodDetailsInProgressHelper.propTypes = {
  ingredients: PropTypes.node,
  id: PropTypes.string,
  instructions: PropTypes.node,
  category: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  nationality: PropTypes.string,
}.isRequired;

export default FoodDetailsInProgressHelper;
