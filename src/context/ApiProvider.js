import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import apiContext from './apiContext';
import {
  apiIngredients,
  apiName,
  apiFirstLetter,
  apiCategory,
  apiCategoryDrinks,
} from '../services/useApi';

function ApiProvider({ children }) {
  const [apiDetails, setApiDetails] = useState(
    { path: '', radio: 'ingredient', input: '', call: false },
  );

  const [recipes, setRecipes] = useState([]);
  const location = useLocation();

  const getPathName = async (e) => {
    if (e === '/foods') {
      setApiDetails({ ...apiDetails, path: 'themealdb' });
    } else {
      setApiDetails({ ...apiDetails, path: 'thecocktaildb' });
    }
  };

  const getCategory = async ({ textContent }) => {
    if (location.pathname === '/foods') {
      const categoryFilter = await apiCategory(textContent);
      setRecipes(categoryFilter);
    } else {
      const categoryFilterDrink = await apiCategoryDrinks(textContent);
      setRecipes(categoryFilterDrink);
    }
  };

  const getRadioValue = ({ value }) => {
    setApiDetails({ ...apiDetails, radio: value });
  };

  const getInputValue = ({ value }) => {
    setApiDetails({ ...apiDetails, input: value });
  };

  const callApi = async () => {
    setApiDetails({ ...apiDetails, call: true });
    const { path, radio, input } = apiDetails;
    if (radio === 'ingredient') {
      const ingredients = await apiIngredients(path, input);
      setRecipes(ingredients);
      return ingredients;
    }
    if (radio === 'name') {
      const name = await apiName(path, input);
      setRecipes(name);
      return name;
    }
    if (radio === 'firstLetter' && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (radio === 'firstLetter') {
      const firstLetter = await apiFirstLetter(path, input);
      setRecipes(firstLetter);
      return firstLetter;
    }
  };

  const context = {
    apiDetails,
    getPathName,
    getRadioValue,
    getInputValue,
    callApi,
    recipes,
    getCategory,
  };
  return (
    <apiContext.Provider value={ context }>
      {children}
    </apiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
