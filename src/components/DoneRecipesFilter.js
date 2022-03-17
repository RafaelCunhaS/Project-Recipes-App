import React from 'react';
import PropTypes from 'prop-types';

function DoneRecipeSFilter(props) {
  const { handleFilter } = props;
  return (
    <div className="favorite-filters">
      <button
        name="All"
        onClick={ handleFilter }
        data-testid="filter-by-all-btn"
        type="button"
        className="button-filters"
      >
        All
      </button>
      <button
        name="Foods"
        onClick={ handleFilter }
        data-testid="filter-by-food-btn"
        type="button"
        className="button-filters"
      >
        Foods
      </button>
      <button
        name="Drinks"
        onClick={ handleFilter }
        data-testid="filter-by-drink-btn"
        type="button"
        className="button-filters"
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
