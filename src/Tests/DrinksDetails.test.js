import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import App from '../App';

describe('Verifica os elementos das telas de detalhes em progresso', () => {
  it('Renderiza os elementos corretos caso o usuário vá a página de drinks em progresso',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/drinks/15997/in-progress');
      const instructions = await screen.findAllByTestId('instructions');
      expect(instructions[0]).toBeInTheDocument();

      const ingredient = await screen.findAllByTestId('drink-checkboxes');
      const finish = await screen.findByTestId('finish-recipe-btn');

      ingredient.forEach((checkbox) => userEvent.click(checkbox));
      userEvent.click(ingredient[0]);
      userEvent.click(ingredient[0]);
      userEvent.click(finish);

      const doneRecipes = await screen.findByText('Done Recipes');
      expect(doneRecipes).toBeInTheDocument();
    });
});
