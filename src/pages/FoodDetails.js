import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { useParams } from 'react-router-dom';
import { RECOMENDATIONS_LENGTH } from '../MAGIC_NUMBER';
import { apiName, getFoodById } from '../services/useApi';
import './FoodDetails.css';

function FoodDetails() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [url, setUrl] = useState('');
  const { id } = useParams();

  useEffect(() => {
    apiName('thecocktaildb')
      .then((data) => setRecomendations(data.drinks));
    getFoodById(id)
      .then((data) => {
        setUrl(data.meals[0].strYoutube.replace(/[^=]*(=)/, 'https://www.youtube.com/embed/'));
        setRecipeDetails(data.meals[0]);
        console.log(data.meals);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <img
        src={ recipeDetails.strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
        width="150"
        height="150"
      />
      <h2 data-testid="recipe-title">{recipeDetails.strMeal}</h2>
      <input type="image" data-testid="share-btn" alt="Share" />
      <input type="image" data-testid="favorite-btn" alt="Favorite" />
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
        width="420"
        height="315"
        title="Recipe Video"
        data-testid="video"
        src={ url }
      />
      <section data-testid="recomendation-card">
        <Carousel itemsToShow={ 2 }>
          {recomendations.splice(0, RECOMENDATIONS_LENGTH)
            .map((card, index) => (
              <section
                key={ card.idDrink }
                data-testid={ `${index}-recomendation-card` }
                show={ 2 }
              >
                <img
                  src={ card.strDrinkThumb }
                  alt="Recommended drink"
                  width="70"
                  height="70"
                />
                <h4>{card.strAlcoholic}</h4>
                <h2>{card.strDrink}</h2>
              </section>))}
        </Carousel>
      </section>
      <button
        className="start-btn"
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </section>
  );
}

export default FoodDetails;
