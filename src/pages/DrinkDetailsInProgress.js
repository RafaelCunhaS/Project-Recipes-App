import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShareButton from '../components/ShareButton';
import { getDrinkById } from '../services/useApi';
import FavoritesButton from '../components/FavoritesButton';
import { addDrinkDetailsInProgress } from '../services/localStorage';

function DrinkDetailsInProgress(props) {
  const { match: { params: { id } } } = props;
  const [drinks, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    getDrinkById(id).then((data) => setDrinks(data.drinks));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIngredients = () => {
    if (drinks.length === 1) {
      const dataDrinks = drinks[0];
      const ingredientsList = [];
      const filterKey = Object.keys(drinks[0]).filter((e) => e.includes('strIngredient'));
      filterKey.forEach((value) => {
        if (dataDrinks[value] !== null && dataDrinks[value] !== '') {
          ingredientsList.push(dataDrinks[value]);
        }
      });
      setIngredients(ingredientsList);
    }
  };

  const getInstructions = () => {
    if (drinks.length === 1) {
      addDrinkDetailsInProgress(id, drinks);
      const dataDrinks = drinks[0];
      const instructionsList = [];
      const filterKey = Object.keys(drinks[0]).filter((e) => e.includes('Instructions'));
      filterKey.forEach((value) => {
        if (dataDrinks[value] !== null) {
          instructionsList.push(dataDrinks[value]);
        }
      });
      setInstructions(instructionsList);
    }
  };

  useEffect(() => {
    getIngredients();
    getInstructions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinks]);

  return (
    <div>
      {drinks.length === 1
        ? (
          <div>
            <h1 data-testid="recipe-title">{ drinks[0].strDrink }</h1>
            <img data-testid="recipe-photo" src={ drinks[0].strDrinkThumb } alt="drink" />
            <ShareButton />
            <FavoritesButton recipeDetails={ drinks } />
            <p data-testid="recipe-category">{ drinks[0].strCategory }</p>
            {ingredients.map((e, index) => (
              <p data-testid={ `${index}-ingredient-step` } key={ index }>{e}</p>
            ))}
            {instructions.map((e, index) => (
              <p data-testid="instructions" key={ index }>{e}</p>
            ))}
            <button data-testid="finish-recipe-btn" type="button">Finish recipe</button>
          </div>
        ) : <h1>Loading</h1> }
    </div>
  );
}

DrinkDetailsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.number),
  }),
}.isRequired;

export default DrinkDetailsInProgress;
