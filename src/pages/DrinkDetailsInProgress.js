import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShareButton from '../components/ShareButton';
import { getDrinkById } from '../services/useApi';
import FavoritesButton from '../components/FavoritesButton';
import DrinkDetailsInProgressHelper from '../components/DrinksDetailsInProgressHelper';

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
    <div className="food-details-container">
      {drinks.length === 1
        ? (
          <div>
            <img data-testid="recipe-photo" src={ drinks[0].strDrinkThumb } alt="drink" />
            <h1 data-testid="recipe-title">{ drinks[0].strDrink }</h1>
            <div className="share-fav-btns">
              <ShareButton />
              <FavoritesButton recipeDetails={ drinks[0] } />
            </div>
            <h3 data-testid="recipe-category">{ drinks[0].strCategory }</h3>
            <h2>Ingredients</h2>
            <DrinkDetailsInProgressHelper
              ingredients={ ingredients }
              instructions={ instructions }
              alcoholicOrNot={ drinks[0].strAlcoholic }
              category={ drinks[0].strCategory }
              id={ id }
              image={ drinks[0].strDrinkThumb }
              name={ drinks[0].strDrink }
              tag={ drinks[0].strTags }
            />
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
