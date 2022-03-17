import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { MAX_FOOD_ARRAY } from '../MAGIC_NUMBER';
import { apiName, getByArea, getNationalities } from '../services/useApi';

function ExploreFoodsNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [renderFoods, setRenderFoods] = useState([]);
  const [nationality, setNationality] = useState('All');

  useEffect(() => {
    getNationalities().then((data) => setNationalities(data.meals));
    apiName('themealdb').then((data) => {
      setRenderFoods(data.meals);
    });
  }, []);

  const handleChange = ({ target: { value } }) => {
    setNationality(value);
  };

  useEffect(() => {
    if (nationality !== 'All') {
      getByArea(nationality)
        .then((data) => setRenderFoods(data.meals));
    } else {
      apiName('themealdb').then((data) => {
        setRenderFoods(data.meals);
      });
    }
  }, [nationality]);

  return (
    <>
      <Header title="Explore Nationalities" />
      <select
        value={ nationality }
        onChange={ handleChange }
        data-testid="explore-by-nationality-dropdown"
        className="nationalities-select"
      >
        <option data-testid="All-option">All</option>
        {nationalities.map(({ strArea }) => (
          <option key={ strArea } data-testid={ `${strArea}-option` }>{strArea}</option>
        ))}
      </select>
      <div className="recipes-cards-container">
        {renderFoods.slice(0, MAX_FOOD_ARRAY).map((food, index) => (
          <Link
            to={ `/foods/${food.idMeal}` }
            key={ food.idMeal }
            className="recipes-cards"
          >
            <section
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ food.strMealThumb }
                alt="cardRecipe"
                data-testid={ `${index}-card-img` }
              />
              <p
                className="recipes-cards-text"
                data-testid={ `${index}-card-name` }
              >
                { food.strMeal }
              </p>
            </section>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsNationalities;
