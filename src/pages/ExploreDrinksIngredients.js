import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import apiContext from '../context/apiContext';
import { MAX_FOOD_ARRAY } from '../MAGIC_NUMBER';
import { getDrinkIngredients } from '../services/useApi';

function ExploreDrinksIngredients() {
  const { setIngredient, setPathname } = useContext(apiContext);
  const [useData, setUseData] = useState([]);
  useEffect(() => {
    getDrinkIngredients().then((data) => {
      setUseData(data.drinks);
    });
  }, []);
  return (
    <>
      <Header title="Explore Ingredients" renderSearch={ false } />
      <div className="recipes-cards-container">
        {useData.length > 0
          && useData.slice(0, MAX_FOOD_ARRAY).map((data, index) => (
            <Link
              to="/drinks"
              key={ data.strIngredient1 }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => {
                setIngredient(data.strIngredient1);
                setPathname('thecocktaildb');
              } }
              className="recipes-cards"
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${data.strIngredient1}-Small.png` }
                alt="drink"
                width="140"
                height="140"
                data-testid={ `${index}-card-img` }
              />
              <p
                className="recipes-cards-text"
                data-testid={ `${index}-card-name` }
              >
                {data.strIngredient1}
              </p>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinksIngredients;
