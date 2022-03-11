import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import apiContext from './apiContext';
import {
  apiIngredients,
  apiName,
  apiFirstLetter,
  apiCategory,
  apiCategoryDrinks,
  apiFilterByAll,
} from '../services/useApi';

function ApiProvider({ children }) {
  const [ingredient, setIngredient] = useState('');
  const [pathname, setPathname] = useState('');
  const [renderByIngredient, setRenderByIngredient] = useState({});
  useEffect(() => {
    if (ingredient && pathname) {
      apiIngredients(pathname, ingredient)
        .then((data) => setRenderByIngredient(data.meals || data.drinks));
    }
  }, [ingredient, pathname]);

  const [apiDetails, setApiDetails] = useState({
    path: '',
    radio: 'ingredient',
    input: '',
    call: false,
    category: '',
  });

  const [recipes, setRecipes] = useState([]);
  const location = useLocation();

  const getPathName = async (e) => {
    if (e === '/foods') {
      setApiDetails({ ...apiDetails, path: 'themealdb' });
    } else {
      setApiDetails({ ...apiDetails, path: 'thecocktaildb' });
    }
  };

  const filterByAll = async ({ textContent }) => {
    setApiDetails({ ...apiDetails, category: textContent });
    if (location.pathname === '/foods') {
      const filterByAllCategories = await apiFilterByAll('themealdb');
      setRecipes(filterByAllCategories);
    } else if (location.pathname === '/drinks') {
      const filterByAllCategories = await apiFilterByAll('thecocktaildb');
      setRecipes(filterByAllCategories);
    }
  };

  const getCategory = async ({ textContent }) => {
    setApiDetails({ ...apiDetails, category: textContent });
    if (location.pathname === '/foods') {
      const categoryFilter = await apiCategory(textContent);
      setRecipes(categoryFilter);
      if (apiDetails.category === textContent) {
        const teste = JSON.parse(localStorage.getItem('Meals'));
        setRecipes(teste);
        setApiDetails({ ...apiDetails, category: '' });
      }
    }

    if (location.pathname === '/drinks') {
      const categoryFilter = await apiCategoryDrinks(textContent);
      setRecipes(categoryFilter);
      if (apiDetails.category === textContent) {
        const teste = JSON.parse(localStorage.getItem('Drinks'));
        setRecipes(teste);
        setApiDetails({ ...apiDetails, category: '' });
      }
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
    filterByAll,
    setIngredient,
    setPathname,
    renderByIngredient,
  };
  return <apiContext.Provider value={ context }>{children}</apiContext.Provider>;
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
