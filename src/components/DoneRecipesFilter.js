import React from 'react';
import PropTypes from 'prop-types';

function DoneRecipeSFilter(props) {
  const { handleFilter } = props;
  return (
    <div>
      <button
        name="All"
        onClick={ handleFilter }
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        name="Foods"
        onClick={ handleFilter }
        data-testid="filter-by-food-btn"
        type="button"
      >
        Foods
      </button>
      <button
        name="Drinks"
        onClick={ handleFilter }
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
    </div>
  );
}

DoneRecipeSFilter.propTypes = {
  handleFilter: PropTypes.func,
}.isRequired;

export default DoneRecipeSFilter;
