import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import App from '../App';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Verifica os elementos das telas de detalhes em progresso', () => {
  it('Renderiza os elementos corretos caso o usuário vá a página de foods em progresso',
    async () => {
      jest.spyOn(navigator.clipboard, 'writeText');
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/foods/52977');
      const share = await screen.findByTestId('share-btn');
      userEvent.click(share);
      const message = await screen.findByText('Link copied!');
      expect(message).toBeInTheDocument();
      history.push('/foods/52977/in-progress');
      const share2 = await screen.findByTestId('share-btn');
      userEvent.click(share2);
      const message2 = await screen.findByText('Link copied!');
      expect(message2).toBeInTheDocument();

      const instructions = await screen.findByTestId('instructions');
      expect(instructions).toBeInTheDocument();

      const ingredient = await screen.findAllByTestId('food-checkboxes');
      const finish = await screen.findByTestId('finish-recipe-btn');

      ingredient.forEach((checkbox) => userEvent.click(checkbox));
      userEvent.click(ingredient[0]);
      userEvent.click(ingredient[0]);
      userEvent.click(finish);

      const doneRecipes = await screen.findByText('Done Recipes');
      expect(doneRecipes).toBeInTheDocument();
    });
});
