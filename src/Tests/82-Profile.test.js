import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import Profile from '../pages/Profile';
import App from '../App';

const emailId = 'profile-email';
const doneButtonId = 'profile-done-btn';
const favoriteButtonId = 'profile-favorite-btn';
const logoutButtonId = 'profile-logout-btn';

describe('Profile screen', () => {
  beforeEach(() => {
    localStorage.setItem('user', '{ "email": "email@mail.com" }');
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('doneRecipes', '[]');
    localStorage.setItem('favoriteRecipes', '[]');
    localStorage.setItem('inProgressRecipes', '{}');
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('82 - Implemente os elementos da a tela de perfil', () => {
    it('Tem todos o data-testid do email e de todos os botões', () => {
      renderWithRouter(
        <ApiProvider>
          <Profile />
        </ApiProvider>,
      );
      const emailText = screen.getByTestId(emailId);
      const doneButton = screen.getByTestId(doneButtonId);
      const favoriteButton = screen.getByTestId(favoriteButtonId);
      const logoutButton = screen.getByTestId(logoutButtonId);

      expect(emailText).toBeInTheDocument();
      expect(doneButton).toBeInTheDocument();
      expect(favoriteButton).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });
  });

  describe('83 - Verifica se o e-mail da pessoa usuária está visível', () => {
    it('O e-mail armazenado em localStorage está visível', () => {
      renderWithRouter(
        <ApiProvider>
          <Profile />
        </ApiProvider>,
      );
      const emailText = screen.getByTestId(emailId);
      expect(emailText).toBeInTheDocument();
      expect(emailText).toHaveTextContent('email@mail.com');
    });
  });

  describe('84 - Implemente 3 botões: "Done Recipes", "Favorite Recipes" e "Logout"',
    () => {
      it('A tela contêm todos os 3 botões', () => {
        renderWithRouter(
          <ApiProvider>
            <Profile />
          </ApiProvider>,
        );
        const doneButton = screen.getByTestId(doneButtonId);
        const favoriteButton = screen.getByTestId(favoriteButtonId);
        const logoutButton = screen.getByTestId(logoutButtonId);

        expect(doneButton).toBeInTheDocument();
        expect(favoriteButton).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();
      });
    });

  describe('85 - Redirecione a pessoa usuária ao clicar no botão de Done Recipes', () => {
    it('Redireciona para a rota correta', () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/profile');
      const doneButton = screen.getByTestId(doneButtonId);
      expect(doneButton).toBeInTheDocument();
      act(() => {
        userEvent.click(doneButton);
      });
      const doneText = screen.getByRole('heading', { name: /done recipes/i });
      expect(doneText).toBeInTheDocument();
    });
  });
});
