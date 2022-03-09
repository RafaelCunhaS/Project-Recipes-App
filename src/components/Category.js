import React, { useState, useEffect, useContext } from 'react';
import apiContext from '../context/apiContext';

function Category() {
  const [category, setCategory] = useState();
  const { getCategory } = useContext(apiContext);

  const getCategories = async () => {
    await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((responseData) => setCategory(responseData));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {category !== undefined
        ? (
          category.meals.map(({ strCategory }, index) => (
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
    </div>
  );
}

export default Category;
