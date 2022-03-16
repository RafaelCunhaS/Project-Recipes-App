import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import Foods from '../pages/Foods';
import App from '../App';

const profileButton = 'search-top-btn';
const searchInputId = 'search-input';
const nameRadioId = 'name-search-radio';
const execButtonId = 'exec-search-btn';

describe('17 - Mostre as receitas em cards caso mais de uma receita seja encontrada',
  () => {
    it('Caso mais de uma comida seja encontrada, mostrar as 12 primeiras',
      async () => {
        const { history } = renderWithRouter(
          <ApiProvider>
            <Foods />
          </ApiProvider>,
        );
        history.push('/foods');
        const searchBtn = screen.getByTestId(profileButton);
        userEvent.click(searchBtn);
        const searchInput = screen.getByTestId(searchInputId);
        const nameRadio = screen.getByTestId(nameRadioId);
        const executeBtn = screen.getByTestId(execButtonId);
        userEvent.type(searchInput, 'chicken');
        userEvent.click(nameRadio);
        userEvent.click(executeBtn);

        const recipeThumb = await screen.findByTestId('11-card-img');
        const recipeName = await screen.findByTestId('11-card-name');
        expect(recipeThumb).toBeInTheDocument();
        expect(recipeName).toBeInTheDocument();
      });

    it('Caso mais de uma bebida seja encontrada, mostrar as 12 primeiras',
      async () => {
        const { history } = renderWithRouter(
          <ApiProvider>
            <App />
          </ApiProvider>,
        );
        history.push('/drinks');
        const searchBtn = screen.getByTestId(profileButton);
        userEvent.click(searchBtn);
        const searchInput = screen.getByTestId(searchInputId);
        const nameRadio = screen.getByTestId(nameRadioId);
        const executeBtn = screen.getByTestId(execButtonId);
        userEvent.type(searchInput, 'a');
        userEvent.click(nameRadio);
        userEvent.click(executeBtn);

        const recipeThumb = await screen.findByTestId('11-card-img');
        const recipeName = await screen.findByTestId('11-card-name');
        expect(recipeThumb).toBeInTheDocument();
        expect(recipeName).toBeInTheDocument();
      });
  });
