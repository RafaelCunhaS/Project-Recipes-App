import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import { RECOMENDATIONS_LENGTH } from '../MAGIC_NUMBER';
import { apiName, getFoodById } from '../services/useApi';
import './FoodDetails.css';
import FavoritesButton from '../components/FavoritesButton';
import { checkDoneRecipes, checkInProgress } from '../services/localStorage';

function FoodDetails() {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const [renderButton, setRenderButton] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const [url, setUrl] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    apiName('thecocktaildb')
      .then((data) => setRecomendations(data.drinks));
    getFoodById(id)
      .then((data) => {
        setUrl(data.meals[0].strYoutube.replace(/[^=]*(=)/, 'https://www.youtube.com/embed/'));
        setRecipeDetails(data.meals[0]);
        if (checkDoneRecipes(data.meals[0].idMeal)) setRenderButton(false);
        if (checkInProgress(data.meals[0].idMeal)) setContinueRecipe(true);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="food-details-container">
      <img
        src={ recipeDetails.strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
        width="150"
        height="150"
      />
      <h2 data-testid="recipe-title">{recipeDetails.strMeal}</h2>
      <ShareButton />
      <FavoritesButton recipeDetails={ recipeDetails } />
      <h4 data-testid="recipe-category">{recipeDetails.strCategory}</h4>
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
      <iframe
        width="280"
        height="200"
        title="Recipe Video"
        data-testid="video"
        src={ url }
      />
      <section className="recommended-cards-container">
        {recomendations.slice(0, RECOMENDATIONS_LENGTH)
          .map((card, index) => (
            <section
              key={ card.idDrink }
              data-testid={ `${index}-recomendation-card` }
              show={ 2 }
              className="recommended-cards"
            >
              <img
                src={ card.strDrinkThumb }
                alt="Recommended drink"
                width="140"
                height="140"
              />
              <h4>{card.strAlcoholic}</h4>
              <h2 data-testid={ `${index}-recomendation-title` }>{card.strDrink}</h2>
            </section>))}
      </section>
      {renderButton && (
        <button
          className="start-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/foods/${id}/in-progress`) }
        >
          {continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>)}
    </section>
  );
}

export default FoodDetails;
