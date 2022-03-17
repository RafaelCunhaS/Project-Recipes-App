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
      <div className="recipes-cards-container">
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
              className="recipes-cards"
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${data.strIngredient}-Small.png` }
                alt="food"
                width="160"
                height="150"
                data-testid={ `${index}-card-img` }
              />
              <p
                className="recipes-cards-text"
                data-testid={ `${index}-card-name` }
              >
                {data.strIngredient}
              </p>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;
