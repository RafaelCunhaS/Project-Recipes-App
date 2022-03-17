import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import { addFavorite, checkFavorites,
  readFavorites, removeFavorite } from '../services/localStorage';

export default function FavoritesButton({ recipeDetails }) {
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (checkFavorites(id)) setFavorite(true);
  }, [id]);

  const handleClick = () => {
    setFavorite(!favorite);
  };

  const getValues = () => {
    if (recipeDetails.idMeal) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipeDetails;
      return {
        id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
    }
    const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = recipeDetails;
    return {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
  };

  useEffect(() => {
    const favorites = readFavorites();
    if (!favorites.some((recipe) => recipe.id === id)) {
      console.log();
      if (favorite) addFavorite(getValues());
    }
    if (!favorite) removeFavorite(recipeDetails.idMeal || recipeDetails.idDrink);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorite]);

  return (
    <input
      type="image"
      src={ favorite ? blackHeart : whiteHeart }
      data-testid="favorite-btn"
      alt="Favorite"
      onClick={ handleClick }
      width="35rem"
      height="35rem"
      className={ favorite ? 'heart' : undefined }
    />
  );
}

FavoritesButton.propTypes = {
  recipeDetails: PropTypes.objectOf(PropTypes.string).isRequired,
};
