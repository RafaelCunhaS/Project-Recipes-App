import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { useParams } from 'react-router-dom';
import { RECOMENDATIONS_LENGTH } from '../MAGIC_NUMBER';
import { apiName, getDrinkById } from '../services/useApi';

function DrinkDetails() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    apiName('themealdb')
      .then((data) => setRecomendations(data.meals))
      .catch((_error) => console.log('xablau'));
    getDrinkById(id)
      .then((data) => {
        setRecipeDetails(data.drinks[0]);
        console.log(data.drinks);
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
      <input type="image" data-testid="share-btn" alt="Share" />
      <input type="image" data-testid="favorite-btn" alt="Favorite" />
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
      <Carousel itemsToShow={ 2 }>
        <section data-testid="recomendation-card">
          {recomendations.splice(0, RECOMENDATIONS_LENGTH)
            .map((card, index) => (
              <section key={ card.idMeal } data-testid={ `${index}-recomendation-card` }>
                <img
                  src={ card.strMealThumb }
                  alt="Recommended meal"
                  width="70"
                  height="70"
                />
                <h4>{card.strCategory}</h4>
                <h2>{card.strMeal}</h2>
              </section>))}
        </section>
      </Carousel>
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

export default DrinkDetails;
