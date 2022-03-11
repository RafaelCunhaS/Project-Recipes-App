import React from 'react';
import PropTypes from 'prop-types';

function FoodIngredients(props) {
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

FoodIngredients.propTypes = {
  ingredients: PropTypes.string.isRequired,
};

export default FoodIngredients;
