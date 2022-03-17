import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Explore.css';

function Explore() {
  const history = useHistory();

  return (
    <>
      <Header title="Explore" renderSearch={ false } />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => history.push('/explore/foods') }
        className="buttons"
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explore/drinks') }
        className="buttons"
      >
        Explore Drinks
      </button>
      <Footer />
    </>
  );
}

export default Explore;
