import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import { RECOMENDATIONS_LENGTH } from '../MAGIC_NUMBER';
import { apiName, getFoodById } from '../services/useApi';
import FavoritesButton from '../components/FavoritesButton';
import { checkDoneRecipes, checkInProgress } from '../services/localStorage';
import './Details.css';

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
      />
      <h1 data-testid="recipe-title">{recipeDetails.strMeal}</h1>
      <div className="share-fav-btns">
        <ShareButton />
        <FavoritesButton recipeDetails={ recipeDetails } />
      </div>
      <h3 data-testid="recipe-category">{recipeDetails.strCategory}</h3>
      <h2 className="details-h2">Ingredients</h2>
      <div className="details-card">
        <div className="ingredient">
          {Object.keys(recipeDetails)
            .filter((e) => e.includes('strIngredient'))
            .filter((el) => recipeDetails[el] !== '')
            .map((ingredient) => (
              <span key={ ingredient }>
                {recipeDetails[ingredient]}
              </span>))}
        </div>
        <div className="measure">
          {Object.keys(recipeDetails)
            .filter((e) => e.includes('strMeasure'))
            .filter((el) => recipeDetails[el] !== ' ')
            .map((measure) => (
              <span key={ measure } className="measure-text">
                {recipeDetails[measure]}
              </span>))}
        </div>
      </div>
      <h2 className="details-h2">Instructions</h2>
      <div className="details-card">
        <p className="instructions-text">{recipeDetails.strInstructions}</p>
      </div>
      <h2 className="details-h2">Video</h2>
      <iframe
        title="Recipe Video"
        data-testid="video"
        src={ url }
      />
      <h2 className="details-h2">Recommended</h2>
      <section className="recommended-cards-container">
        {recomendations.slice(0, RECOMENDATIONS_LENGTH)
          .map((card) => (
            <div key={ card.idDrink } className="recommended-cards recipes-cards">
              <section className="recommended-card-single">
                <img
                  src={ card.strDrinkThumb }
                  alt="Recommended drink"
                />
                <h4>{card.strAlcoholic}</h4>
                <h2 className="recipes-cards-text h2">{card.strDrink}</h2>
              </section>
            </div>))}
      </section>
      {renderButton && (
        <button
          className="start-btn buttons"
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
