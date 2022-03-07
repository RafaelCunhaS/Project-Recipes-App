import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  const handleClick = ({ target: { name } }) => {
    if (name === 'drinks') history.push('/drinks');
    if (name === 'explore') history.push('/explore');
    if (name === 'foods') history.push('/foods');
  };

  return (
    <footer className="footer" data-testid="footer">
      <button
        className="button-drinks"
        label="drinks"
        src={ drinkIcon }
        name="drinks"
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ handleClick }
      />
      <button
        className="button-explore"
        label="explore"
        src={ exploreIcon }
        type="button"
        name="explore"
        data-testid="explore-bottom-btn"
        onClick={ handleClick }
      />
      <button
        className="button-meal"
        label="foods"
        src={ mealIcon }
        type="button"
        name="foods"
        data-testid="food-bottom-btn"
        onClick={ handleClick }
      />
    </footer>
  );
}

export default Footer;
