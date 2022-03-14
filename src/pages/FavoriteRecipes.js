import React, { useEffect, useState } from 'react';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import FavoriteRecipesFilter from '../components/FavoriteRecipesFilter';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [callback, setCallback] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState(true);
  const [radioFilter, setRadioFilter] = useState({ filter: 'All' });

  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(getFavorites);
  }, [callback]);

  useEffect(() => {
    if (radioFilter === 'food') {
      const getFood = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filterFood = getFood.filter((e) => e.type === radioFilter);
      setFavorites(filterFood);
    } else if (radioFilter === 'drink') {
      const getDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filterDrink = getDrink.filter((e) => e.type === radioFilter);
      setFavorites(filterDrink);
    } else {
      const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(getFavorites);
    }
  }, [radioFilter]);

  useEffect(() => {
    if ('favoriteRecipes' in localStorage) {
      const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(getFavorites);
    }
  }, []);

  const handleFilter = ({ target: { name } }) => {
    if (name === 'Foods') {
      setRadioFilter('food');
    } else if (name === 'Drinks') {
      setRadioFilter('drink');
    } else {
      setRadioFilter('All');
    }
  };

  const favoriteClick = ({ target: { value } }) => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filter = getFavoriteRecipes.filter((e) => e.id !== value);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
    setFavorite(!favorite);
    setCallback(callback + 1);
  };

  return (
    <div>
      <Header title="Favorite Recipes" renderSearch={ false } />
      <FavoriteRecipesFilter handleFilter={ handleFilter } />
      <FavoriteRecipesCard
        favorites={ favorites }
        favoriteClick={ favoriteClick }
        favorite={ favorite }
      />
    </div>
  );
}

export default FavoriteRecipes;
