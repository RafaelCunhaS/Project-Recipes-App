import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import apiContext from '../context/apiContext';

function RadioSearch() {
  const history = useHistory();
  const { pathname } = history.location;
  const { getPathName, getRadioValue, callApi } = useContext(apiContext);

  useEffect(() => {
    getPathName(pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <label htmlFor="ingredient">
        Ingredient
        <input
          defaultChecked
          onClick={ ({ target }) => getRadioValue(target) }
          value="ingredient"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="searchControl"
          type="radio"
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          onClick={ ({ target }) => getRadioValue(target) }
          value="name"
          data-testid="name-search-radio"
          id="name"
          name="searchControl"
          type="radio"
        />
      </label>

      <label htmlFor="firstLetter">
        First letter
        <input
          onClick={ ({ target }) => getRadioValue(target) }
          value="firstLetter"
          data-testid="first-letter-search-radio"
          id="firstLetter"
          name="searchControl"
          type="radio"
        />
      </label>

      <button
        onClick={ () => callApi() }
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </>
  );
}

export default RadioSearch;
