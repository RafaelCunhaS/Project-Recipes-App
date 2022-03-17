import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getRandomFood } from '../services/useApi';

function ExploreFoods() {
  const [mealId, setMealId] = useState('');
  const history = useHistory();

  useEffect(() => {
    getRandomFood()
      .then((data) => setMealId(data.meals[0].idMeal));
  }, []);

  return (
    <>
      <Header title="Explore Foods" renderSearch={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
        className="buttons"
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
        className="buttons"
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/foods/${mealId}`) }
        className="buttons"
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}

export default ExploreFoods;
