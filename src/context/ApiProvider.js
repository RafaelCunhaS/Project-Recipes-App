import React, { useState } from 'react';
import PropTypes from 'prop-types';
import apiContext from './apiContext';

function ApiProvider({ children }) {
  const [apiDetails, setApiDetails] = useState(
    { path: '', radio: 'ingredient', input: '' },
  );

  const getPathName = (e) => {
    setApiDetails({ ...apiDetails, path: e });
  };

  const getRadioValue = ({ value }) => {
    setApiDetails({ ...apiDetails, radio: value });
  };

  const getInputValue = ({ value }) => {
    setApiDetails({ ...apiDetails, input: value });
  };

  const callApi = () => {
    const { path, radio, input } = apiDetails;
    if (path === '/foods' && radio === 'ingredient') {
      console.log(input);
    }
    if (path === '/foods' && radio === 'name') {
      console.log('food.name');
    }
    if (path === '/foods' && radio === 'firstLetter') {
      console.log('food.firstLetter');
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
