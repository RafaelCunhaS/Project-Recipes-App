import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShareButton from '../components/ShareButton';
import FavoritesButton from '../components/FavoritesButton';
import FoodIngredients from '../components/FoodIngredients';
import { getFoodById } from '../services/useApi';

function FoodDetailsInProgress(props) {
  const { match: { params: { id } } } = props;
  const [foods, setFoods] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    getFoodById(id).then((data) => setFoods(data.meals));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIngredients = () => {
    if (foods.length === 1) {
      const dataFoods = foods[0];
      const ingredientsList = [];
      const filterKey = Object.keys(dataFoods).filter((e) => e.includes('strIngredient'));
      filterKey.forEach((value) => {
        if (dataFoods[value] !== null && dataFoods[value] !== '') {
          ingredientsList.push(dataFoods[value]);
        }
      });
      setIngredients(ingredientsList);
    }
  };

  const getInstructions = () => {
    if (foods.length === 1) {
      const dataFoods = foods[0];
      const instructionsList = [];
      const filterKey = Object.keys(dataFoods).filter((e) => e.includes('Instructions'));
      filterKey.forEach((value) => {
        if (dataFoods[value] !== null && dataFoods[value] !== '') {
          instructionsList.push(dataFoods[value]);
        }
      });
      setInstructions(instructionsList);
    }
  };

  useEffect(() => {
    getIngredients();
    getInstructions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foods]);

  return (
    <div>
      {foods.length === 1
        ? (
          <div>
            <h1 data-testid="recipe-title">{ foods[0].strMeal }</h1>
            <img data-testid="recipe-photo" src={ foods[0].strMealThumb } alt="drink" />
            <ShareButton />
            <FavoritesButton recipeDetails={ foods } />
            <p data-testid="recipe-category">{ foods[0].strCategory }</p>
            {ingredients.map((e, index) => (
              <FoodIngredients
                key={ index }
                ingredients={ e }
                id={ id }
                index={ index }
              />
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

FoodDetailsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.number),
  }),
}.isRequired;

export default FoodDetailsInProgress;
