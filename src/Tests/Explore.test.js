import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import App from '../App';

describe('Verifica a página de explorar', () => {
  it('Renderiza os elementos corretos nas páginas de explorar',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/explore');
      const exploreFoods = screen.getByTestId('explore-foods');
      userEvent.click(exploreFoods);
      const text = await screen.findByText('Explore Foods');
      expect(text).toBeInTheDocument();

      const exploreIngredients = screen.getByTestId('explore-by-ingredient');
      userEvent.click(exploreIngredients);
      const ingredientsText = await screen.findByText('Explore Ingredients');
      expect(ingredientsText).toBeInTheDocument();

      history.push('/explore/foods');
      const exploreNationalities = screen.getByTestId('explore-by-nationality');
      userEvent.click(exploreNationalities);
      const nationalityText = await screen.findByText('Explore Nationalities');
      expect(nationalityText).toBeInTheDocument();
    });

  it('Renderiza os elementos corretos nas páginas de explorar',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/explore');
      const exploreDrinks = screen.getByTestId('explore-drinks');
      userEvent.click(exploreDrinks);
      const text = await screen.findByText('Explore Drinks');
      expect(text).toBeInTheDocument();

      const exploreIngredients = screen.getByTestId('explore-by-ingredient');
      userEvent.click(exploreIngredients);
      const ingredientsText = await screen.findByText('Explore Ingredients');
      expect(ingredientsText).toBeInTheDocument();
    });
});

describe('Verifica os elementos das telas de explorar', () => {
  it('Renderiza os cards corretos se escolhido certo ingrediente',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/explore/foods/ingredients');
      const ingredient = await screen.findByTestId('0-ingredient-card');
      userEvent.click(ingredient);

      const recipe = await screen.findByText('Brown Stew Chicken');

      expect(recipe).toBeInTheDocument();
    });
  it('Renderiza um "not found" caso o usuário tente acessar a página que não existe',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/explore/drinks/nationalities');
      const notFound = await screen.findByText('Not Found');
      expect(notFound).toBeInTheDocument();
    });
});
