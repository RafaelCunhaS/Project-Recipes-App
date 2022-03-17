import React, { useState, useEffect } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import DoneRecipeSFilter from '../components/DoneRecipesFilter';
import Header from '../components/Header';
import './DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [radioFilter, setRadioFilter] = useState({ filter: 'All' });

  const handleFilter = ({ target: { name } }) => {
    if (name === 'Foods') {
      setRadioFilter('food');
    } else if (name === 'Drinks') {
      setRadioFilter('drink');
    } else {
      setRadioFilter('All');
    }
  };

  useEffect(() => {
    if (radioFilter === 'food') {
      const getFood = JSON.parse(localStorage.getItem('doneRecipes'));
      const filterFood = getFood.filter((e) => e.type === radioFilter);
      setDoneRecipes(filterFood);
    } else if (radioFilter === 'drink') {
      const getDrink = JSON.parse(localStorage.getItem('doneRecipes'));
      const filterDrink = getDrink.filter((e) => e.type === radioFilter);
      setDoneRecipes(filterDrink);
    } else {
      const getFavorites = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(getFavorites);
    }
  }, [radioFilter]);

  useEffect(() => {
    if ('doneRecipes' in localStorage) {
      const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(getDoneRecipes);
    }
  }, []);

  return (
    <div>
      <Header title="Done Recipes" renderSearch={ false } />
      <DoneRecipeSFilter handleFilter={ handleFilter } />
      <DoneRecipesCard doneRecipes={ doneRecipes } />
    </div>
  );
}

export default DoneRecipes;
