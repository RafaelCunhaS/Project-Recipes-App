import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { RECOMENDATIONS_LENGTH } from '../MAGIC_NUMBER';
import { apiName, getDrinkById } from '../services/useApi';
import ShareButton from '../components/ShareButton';
import FavoritesButton from '../components/FavoritesButton';
import './DrinkDetails.css';
import { checkDoneRecipes, checkInProgress } from '../services/localStorage';

function DrinkDetails() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [renderButton, setRenderButton] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    apiName('themealdb')
      .then((data) => setRecomendations(data.meals));
    getDrinkById(id)
      .then((data) => {
        setRecipeDetails(data.drinks[0]);
        if (checkDoneRecipes(data.drinks[0].idDrink)) setRenderButton(false);
        if (checkInProgress(data.drinks[0].idDrink)) setContinueRecipe(true);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <img
        src={ recipeDetails.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
        width="150"
        height="150"
      />
      <h2 data-testid="recipe-title">{recipeDetails.strDrink}</h2>
      <ShareButton />
      <FavoritesButton recipeDetails={ recipeDetails } />
      <h4 data-testid="recipe-category">{recipeDetails.strAlcoholic}</h4>
      {Object.keys(recipeDetails)
        .filter((e) => e.includes('strIngredient'))
        .map((ingredient, index) => (
          <span key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
            {recipeDetails[ingredient]}
          </span>))}
      {Object.keys(recipeDetails)
        .filter((e) => e.includes('strMeasure'))
        .map((measure, index) => (
          <span key={ measure } data-testid={ `${index}-ingredient-name-and-measure` }>
            {recipeDetails[measure]}
          </span>))}
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <div className="recommended-cards-container">
        {recomendations.slice(0, RECOMENDATIONS_LENGTH)
          .map((card, index) => (
            <section
              className="recommended-cards"
              key={ card.idMeal }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ card.strMealThumb }
                alt="Recommended meal"
                width="140"
                height="140"
              />
              <h4>{card.strCategory}</h4>
              <h2 data-testid={ `${index}-recomendation-title` }>{card.strMeal}</h2>
            </section>))}
      </div>
      {renderButton && (
        <button
          className="start-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          {continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>)}
    </section>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.number),
  }),
}.isRequired;

export default DrinkDetails;
