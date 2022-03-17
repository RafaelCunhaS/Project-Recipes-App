import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getRandomDrink } from '../services/useApi';

function ExploreDrinks() {
  const [drinkId, setDrinkId] = useState('');
  const history = useHistory();

  useEffect(() => {
    getRandomDrink()
      .then((data) => setDrinkId(data.drinks[0].idDrink));
  }, []);

  return (
    <div>
      <Header title="Explore Drinks" renderSearch={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
        className="buttons"
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/drinks/${drinkId}`) }
        className="buttons"
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
