import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import apiContext from '../context/apiContext';

function RadioSearch() {
  const history = useHistory();
  const { pathname } = history.location;
  const { getPathName, getRadioValue, callApi } = useContext(apiContext);

  const verifyRecipe = (data) => {
    if (data === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const searchHelpFood = (value) => {
    if (value.length === 1) {
      const { idMeal } = value[0];
      history.push(`/foods/${idMeal}`);
    }
  };

  const searchHelpDrink = (value) => {
    if (value.length === 1) {
      const { idDrink } = value[0];
      history.push(`/drinks/${idDrink}`);
    }
  };

  const handleSearch = async () => {
    if (pathname === '/foods') {
      const data = await callApi();
      if (data) {
        verifyRecipe(data.meals);
        if (data.meals !== null) {
          searchHelpFood(data.meals);
        }
      }
    }
    if (pathname === '/drinks') {
      const data = await callApi();
      if (data) {
        verifyRecipe(data.drinks);
        if (data.drinks !== null) {
          searchHelpDrink(data.drinks);
        }
      }
    }
  };

  useEffect(() => {
    getPathName(pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <label htmlFor="ingredient">
        Ingredient
        <input
          defaultChecked
          onClick={ ({ target }) => getRadioValue(target) }
          value="ingredient"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="searchControl"
          type="radio"
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          onClick={ ({ target }) => getRadioValue(target) }
          value="name"
          data-testid="name-search-radio"
          id="name"
          name="searchControl"
          type="radio"
        />
      </label>

      <label htmlFor="firstLetter">
        First letter
        <input
          onClick={ ({ target }) => getRadioValue(target) }
          value="firstLetter"
          data-testid="first-letter-search-radio"
          id="firstLetter"
          name="searchControl"
          type="radio"
        />
      </label>

      <button
        onClick={ handleSearch }
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </>
  );
}

export default RadioSearch;
