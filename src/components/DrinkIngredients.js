import React from 'react';
import PropTypes from 'prop-types';

function DrinkIngredients(props) {
  const { saveIngredients, index, ingredients, checked } = props;

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

DrinkIngredients.defaultProps = {
  checked: PropTypes.undefined,
};

DrinkIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  saveIngredients: PropTypes.func.isRequired,
  ingredients: PropTypes.node.isRequired,
  checked: PropTypes.bool,
};

export default DrinkIngredients;
