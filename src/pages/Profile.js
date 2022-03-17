import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { readEmail } from '../services/localStorage';
import './Profile.css';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (readEmail()) setEmail(readEmail().email);
  }, []);

  return (
    <>
      <Header title="Profile" renderSearch={ false } />
      <p data-testid="profile-email" className="profile-email">{email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
        className="buttons"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
        className="buttons"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
        className="buttons"
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
