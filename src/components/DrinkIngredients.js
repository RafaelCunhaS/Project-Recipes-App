import React from 'react';
import PropTypes from 'prop-types';

function DrinkIngredients(props) {
  const { ingredients } = props;
  return (
    <div>
      <label data-testid="ingredient-step" htmlFor="ingredients">
        { ingredients }
        <input type="checkbox" />
      </label>
    </div>
  );
}

DrinkIngredients.propTypes = {
  ingredients: PropTypes.string.isRequired,
};

export default DrinkIngredients;
