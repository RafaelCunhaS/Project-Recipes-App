import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';
import Login from '../pages/Login';

const email = 'email-input';
const password = 'password-input';
const buttonLogin = 'login-submit-btn';
const validEmail = 'emailvalido@gmail.com';
const invalidEmail = 'emailinvalido';
const validPassword = '1234567';
const invalidPassword = '123456';

function login() {
  const emailInput = screen.getByTestId(email);
  const passwordInput = screen.getByTestId(password);
  const loginBtn = screen.getByTestId(buttonLogin);
  userEvent.type(emailInput, validEmail);
  userEvent.type(passwordInput, '1234567');
  userEvent.click(loginBtn);
}

describe('2 - Cria todos os elementos descritos no protótipo para a tela de login',
  () => {
    it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
      renderWithRouter(<Login />);
      const emailInput = screen.getByTestId(email);
      const passwordInput = screen.getByTestId(password);
      const loginBtn = screen.getByTestId(buttonLogin);
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginBtn).toBeInTheDocument();
    });
  });

describe('3 - Verifica se consegue escrever seu email no input de email',
  () => {
    it('É possível escrever o email', () => {
      renderWithRouter(<Login />);
      const emailInput = screen.getByTestId(email);
      userEvent.type(emailInput, validEmail);
      expect(emailInput).toHaveValue(validEmail);
    });
  });

describe('4 - Verifica se consegue escrever sua senha no input de senha',
  () => {
    it('É possível escrever a senha', () => {
      renderWithRouter(<Login />);
      const passwordInput = screen.getByTestId(password);
      userEvent.type(passwordInput, validPassword);
      expect(passwordInput).toHaveValue(validPassword);
    });
  });

describe('5 - Verifica se o botão é habilitado', () => {
  beforeEach(() => renderWithRouter(<Login />));
  it('O botão deve estar desativado se o email for inválido', () => {
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginBtn = screen.getByTestId(buttonLogin);
    userEvent.type(emailInput, invalidEmail);
    userEvent.type(passwordInput, validPassword);
    expect(loginBtn).toBeDisabled();
  });

  it('O botão deve estar desativado se a senha tiver 6 caracteres ou menos', () => {
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginBtn = screen.getByTestId(buttonLogin);
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, invalidPassword);
    expect(loginBtn).toBeDisabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const loginBtn = screen.getByTestId(buttonLogin);
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    expect(loginBtn).toBeEnabled();
  });
});

describe('6 - Verifica se salva 2 tokens no localStorage após a submissão', () => {
  it('mealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    renderWithRouter(<Login />);
    login();

    const mealsToken = localStorage.getItem('mealsToken');
    const cockTails = localStorage.getItem('mealsToken');
    expect(mealsToken).toBe('1');
    expect(cockTails).toBe('1');
  });
});

describe('7 - Verifica se salva o e-mail da pessoa usuária no localStorage', () => {
  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    renderWithRouter(<Login />);
    login();

    const user = JSON.parse(localStorage.getItem('user'));
    expect(user.email).toBe(validEmail);
  });
});

describe('8 - Verifica se redirecione o usuário para a tela principal de receita', () => {
  it('A rota muda para a tela principal de receitas de comidas', () => {
    renderWithRouter(<App />);
    login();

    const foodsTitle = screen.getByRole('heading',
      {
        level: 2,
        name: /Foods/i,
      });
    expect(foodsTitle).toBeInTheDocument();
  });
});
