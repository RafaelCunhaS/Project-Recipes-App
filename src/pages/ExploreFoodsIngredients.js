import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import apiContext from '../context/apiContext';
import { MAX_FOOD_ARRAY } from '../MAGIC_NUMBER';
import { getFoodIngredients } from '../services/useApi';

function ExploreFoodsIngredients() {
  const { setIngredient, setPathname } = useContext(apiContext);
  const [useData, setUseData] = useState([]);
  useEffect(() => {
    getFoodIngredients().then((data) => {
      setUseData(data.meals);
    });
  }, []);
  return (
    <>
      <Header title="Explore Ingredients" renderSearch={ false } />
      {useData.length > 0
        && useData.slice(0, MAX_FOOD_ARRAY).map((data, index) => (
          <Link
            to="/foods"
            key={ data.strIngredient }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => {
              setIngredient(data.strIngredient);
              setPathname('themealdb');
            } }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${data.strIngredient}-Small.png` }
              alt="food"
              width="140"
              height="140"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{data.strIngredient}</p>
          </Link>
        ))}
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
