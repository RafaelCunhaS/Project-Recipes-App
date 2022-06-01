import React from 'react';
import PropTypes from 'prop-types';

function DrinkIngredients(props) {
  const { saveIngredients, index, ingredients, checked } = props;

  return (
    <div>
      <label
        className="strikethrough"
        data-testid={ `${index}-ingredient-step` }
        htmlFor="ingredients"
      >
        <input
          data-testid="drink-checkboxes"
          checked={ checked }
          name={ ingredients }
          onChange={ saveIngredients }
          type="checkbox"
        />
        <span>{ ingredients }</span>
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
