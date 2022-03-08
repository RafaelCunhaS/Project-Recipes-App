import React, { useState } from 'react';
import PropTypes from 'prop-types';
import apiContext from './apiContext';
import { apiIngredients, apiName, apiFirstLetter } from '../services/useApi';

function ApiProvider({ children }) {
  const [apiDetails, setApiDetails] = useState(
    { path: '', radio: 'ingredient', input: '' },
  );

  const getPathName = (e) => {
    if (e === '/foods') {
      setApiDetails({ ...apiDetails, path: 'themealdb' });
    } else {
      setApiDetails({ ...apiDetails, path: 'thecocktaildb' });
    }
  };

  const getRadioValue = ({ value }) => {
    setApiDetails({ ...apiDetails, radio: value });
  };

  const getInputValue = ({ value }) => {
    setApiDetails({ ...apiDetails, input: value });
  };

  const callApi = () => {
    const { path, radio, input } = apiDetails;
    if (radio === 'ingredient') {
      apiIngredients(path, input);
    } else if (radio === 'name') {
      apiName(path, input);
    }
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      apiFirstLetter(path, input);
    }
  };

  const context = { getPathName, getRadioValue, getInputValue, callApi };
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
