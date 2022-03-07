import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ title, renderSearch = true }) {
  const history = useHistory();
  return (
    <header>
      <button
        id="button-profile"
        type="button"
        src={ profile }
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
        label="profile"
      />

      <h2 data-testid="page-title">{title}</h2>
      {renderSearch && (
        <button
          data-testid="search-top-btn"
          src={ searchIcon }
          type="button"
          label="search"
        />
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
