import React from 'react';
import PropTypes from 'prop-types';

function FoodIngredients(props) {
  const { ingredients, saveIngredients, checked, index } = props;

  return (
    <div>
      <label data-testid={ `${index}-ingredient-step` } htmlFor="ingredients">
        { ingredients }
        <input
          checked={ checked }
          name={ ingredients }
          onChange={ saveIngredients }
          type="checkbox"
        />
      </label>
    </div>
  );
}

FoodIngredients.defaultProps = {
  checked: PropTypes.undefined,
};

FoodIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  saveIngredients: PropTypes.func.isRequired,
  ingredients: PropTypes.node.isRequired,
  checked: PropTypes.bool,
};

export default FoodIngredients;
