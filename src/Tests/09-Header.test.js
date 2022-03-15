import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import App from '../App';

describe('Testa o componente Header', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );
    history.push('/foods');
  });

  it('09 - Testa se é renderizado o icone de profile, o título e o icone de procura',
    () => {
      const foodsTitle = screen.getByRole('heading',
        {
          level: 2,
          name: /Foods/i,
        });
      expect(foodsTitle).toBeInTheDocument();
      const foodsTitleId = screen.getByTestId('page-title');
      expect(foodsTitleId).toBeInTheDocument();

      const profileBtn = screen.getByTestId('profile-top-btn');
      expect(profileBtn).toBeInTheDocument();
      expect(profileBtn).toHaveAttribute('SRC', 'profileIcon.svg');

      const searchBtn = screen.getByTestId('search-top-btn');
      expect(searchBtn).toBeInTheDocument();
      expect(searchBtn).toHaveAttribute('SRC', 'searchIcon.svg');
    });
  it('11 - Testa se o usuário é redirecionado para a tela de perfil clicando no ícone',
    () => {
      const profileBtn = screen.getByTestId('profile-top-btn');
      userEvent.click(profileBtn);

      const profileTitle = screen.getByRole('heading',
        {
          level: 2,
          name: /profile/i,
        });
      expect(profileTitle).toBeInTheDocument();
    });

  it('12 - Testa botão de busca ao ser clicado, a barra de deve aparecer ou escondê-la',
    () => {
      const searchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(searchBtn);

      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toBeInTheDocument();

      userEvent.click(searchBtn);
      expect(searchInput).not.toBeInTheDocument();
    });
  it('13 - Testa se está aparecendo a input de busca, filtros e botão Search',
    () => {
      const searchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(searchBtn);

      const searchInput = screen.getByTestId('search-input');
      const ingredientRadio = screen.getByTestId('ingredient-search-radio');
      const nomeRadio = screen.getByTestId('name-search-radio');
      const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
      const executeBtn = screen.getByTestId('exec-search-btn');

      expect(searchInput).toBeInTheDocument();
      expect(ingredientRadio).toBeInTheDocument();
      expect(nomeRadio).toBeInTheDocument();
      expect(firstLetterRadio).toBeInTheDocument();
      expect(executeBtn).toBeInTheDocument();
      expect(firstLetterRadio).toBeInTheDocument();
    });
  it('14 - Testa se é renderizado 3 radio buttons: Ingredient, Name e First letter',
    async () => {
      const searchBtn = screen.getByTestId('search-top-btn');
      userEvent.click(searchBtn);

      /* const searchRadio = screen.getByTestId('ingredient-search-radio');
      userEvent.click(searchRadio); */

      const searchInput = screen.getByTestId('search-input');
      userEvent.type(searchInput, 'beef');

      const executeBtn = screen.getByTestId('exec-search-btn');
      userEvent.click(executeBtn);

    const beefTest = await screen.getByTestId('0-recipe-card');
      expect(beefTest).toBeInTheDocument();
    });

  it('15 - Testa bebidas, o radio selecionado for Ingredient, busca na API item', () => {
    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const searchRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(searchRadio);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'lemon');

    const searchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(searchBtn);
  });
});
