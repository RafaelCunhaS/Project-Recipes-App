import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente "Login"', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const ValidEmail = 'email@email.com';
  const ValidPassword = '1234567';

  const email = 'email-input';
  const password = 'password-input';
  const button = 'login-submit-btn';

  it('02 - Testa se aparece os Inputs de Email, Senha e Botão de Login  ', () => {
    expect(screen.getByTestId(email)).toBeInTheDocument();
    expect(screen.getByTestId(password)).toBeInTheDocument();
    expect(screen.getByTestId(button)).toBeInTheDocument();
  });

  it('03 - Testa se o usuário consegue escrever seu email no input Email', () => {
    const emailInput = screen.getByTestId(email);

    userEvent.type(emailInput, ValidEmail);
    expect(emailInput).toHaveValue(ValidEmail);
  });

  it('05 -Testa se o botão "Login" é válido após email e uma senha válida', () => {
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const LoginBtn = screen.getByTestId(button);

    expect(LoginBtn).toBeDisabled();
    userEvent.type(emailInput, 'email@email');
    userEvent.type(passwordInput, ValidPassword);
    expect(LoginBtn).toBeDisabled();

    userEvent.type(emailInput, 'email.com');
    userEvent.type(passwordInput, ValidPassword);
    expect(LoginBtn).toBeDisabled();

    userEvent.type(emailInput, ValidEmail);
    userEvent.type(passwordInput, '12345');
    expect(LoginBtn).toBeDisabled();

    userEvent.type(emailInput, ValidEmail);
    userEvent.type(passwordInput, ValidPassword);
    expect(LoginBtn).not.toBeDisabled();
  });

  it('06-Testa 2 tokens no LS após submissão,mealsToken e cocktailsToken', () => {
    localStorage.clear();
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const LoginBtn = screen.getByTestId(button);

    userEvent.type(emailInput, ValidEmail);
    userEvent.type(passwordInput, ValidPassword);
    userEvent.click(LoginBtn);

    const mealsToken = localStorage.getItem('mealsToken');
    const drinksToken = localStorage.getItem('cocktailsToken');

    expect(mealsToken).toBe('1');
    expect(drinksToken).toBe('1');
  });
  it('07 - Testa se o e-mail da pessoa usuária é salva no localStorage  chave user',
    () => {
      localStorage.clear();
      const emailInput = screen.getByTestId(email);
      const passwordInput = screen.getByTestId(password);
      const LoginBtn = screen.getByTestId(button);

      userEvent.type(emailInput, ValidEmail);
      userEvent.type(passwordInput, ValidPassword);
      userEvent.click(LoginBtn);

      const userToken = JSON.parse(localStorage.getItem('user'));
      expect(userToken.email).toBe(ValidEmail);
    });

  it('08 - Testa se o usuário é redirecionado para a tela principal ', () => {
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const LoginBtn = screen.getByTestId(button);

    userEvent.type(emailInput, ValidEmail);
    userEvent.type(passwordInput, ValidPassword);
    userEvent.click(LoginBtn);

    const foodsTitle = screen.getByRole('heading',
      {
        level: 2,
        name: /Foods/i,
      });
    expect(foodsTitle).toBeInTheDocument();
  });
});
