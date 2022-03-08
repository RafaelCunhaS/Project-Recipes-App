import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ title, renderSearch = true }) {
  const [renderSearchBar, setRenderSearchBar] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <header className="header">
      <input
        type="image"
        src={ profile }
        data-testid="profile-top-btn"
        alt="profile"
        onClick={ () => pathname !== '/profile' && history.push('/profile') }
      />
      <h2 data-testid="page-title">{title}</h2>
      {renderSearch && (
        <input
          type="image"
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="search"
          onClick={ () => setRenderSearchBar(!renderSearchBar) }
        />
      )}

      {renderSearchBar && (
        <input
          data-testid="search-input"
          type="text"
        />
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
