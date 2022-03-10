import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import apiContext from '../context/apiContext';
import { MAX_FOOD_CATEGORY } from '../MAGIC_NUMBER';

function Category() {
  const location = useLocation();
  const [category, setCategory] = useState();
  const { getCategory, filterByAll } = useContext(apiContext);

  const getCategories = async () => {
    if (location.pathname === '/foods') {
      await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((responseData) => setCategory(responseData));
    } else if (location.pathname === '/drinks') {
      await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((responseData) => setCategory(responseData));
    }
  };

  useEffect(() => {
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        onClick={ ({ target }) => filterByAll(target) }
        type="button"
        data-testid="All-category-filter"
      >
        Alls
      </button>
      {category !== undefined && location.pathname === '/foods'
        ? (
          category.meals.slice(0, MAX_FOOD_CATEGORY).map(({ strCategory }, index) => (
            <button
              onClick={ ({ target }) => getCategory(target) }
              type="button"
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          ))
        ) : null }

      {category !== undefined && location.pathname === '/drinks'
        ? (
          category.drinks.slice(0, MAX_FOOD_CATEGORY).map(({ strCategory }) => (
            <button
              onClick={ ({ target }) => getCategory(target) }
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          ))
        ) : null }
    </div>
  );
}

export default Category;
