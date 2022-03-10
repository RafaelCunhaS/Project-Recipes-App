import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import apiContext from '../context/apiContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  const { pathname } = history.location;
  const { getPathName } = useContext(apiContext);

  const handleClick = ({ target: { name } }) => {
    if (name === '/drinks' && name !== pathname) {
      history.push('/drinks');
      getPathName('/drinks');
    }
    if (name === '/explore' && name !== pathname) history.push('/explore');
    if (name === '/foods' && name !== pathname) {
      history.push('/foods');
      getPathName('/foods');
    }
  };

  return (
    <footer className="footer" data-testid="footer">
      <input
        type="image"
        name="/drinks"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        alt="drinks"
        onClick={ handleClick }
        width="60"
        height="60"
      />
      <input
        type="image"
        name="/explore"
        src={ exploreIcon }
        data-testid="explore-bottom-btn"
        alt="explore"
        onClick={ handleClick }
        width="60"
        height="60"
      />
      <input
        type="image"
        name="/foods"
        src={ mealIcon }
        data-testid="food-bottom-btn"
        alt="foods"
        onClick={ handleClick }
        width="60"
        height="60"
      />
    </footer>
  );
}

export default Footer;
