import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PASSWORD_LENGTH } from '../MAGIC_NUMBER';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [button, setButton] = useState(true);
  const [password, setPassword] = useState('');
  const history = useHistory();

  function handleChange({ target: { value, name } }) {
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  useEffect(() => {
    if (email.includes('.com') && email.includes('@')
    && password.length > PASSWORD_LENGTH) {
      setButton(false);
    } else setButton(true);
  }, [email, password]);

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  }

  return (
    <form className="login-container">
      <input
        data-testid="email-input"
        type="email"
        className="login-inputs"
        onChange={ handleChange }
        placeholder="Email"
        value={ email }
        name="email"
      />
      <input
        type="password"
        data-testid="password-input"
        className="login-inputs"
        placeholder="Password"
        onChange={ handleChange }
        value={ password }
        name="password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        className="login-btn"
        disabled={ button }
        onClick={ handleClick }
      >
        Login
      </button>
    </form>
  );
}

export default Login;
