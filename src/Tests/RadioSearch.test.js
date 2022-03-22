import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import Foods from '../pages/Foods';
import App from '../App';

const profileButton = 'search-top-btn';
const searchInputId = 'search-input';
const ingredientRadioId = 'ingredient-search-radio';
const nameRadioId = 'name-search-radio';
const firstLetterId = 'first-letter-search-radio';
const execButtonId = 'exec-search-btn';

describe('13 - Verifica os elementos da barra de busca', () => {
  it('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons',
    () => {
      renderWithRouter(
        <ApiProvider>
          <Foods />
        </ApiProvider>,
      );
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);

      const searchInput = screen.getByTestId(profileButton);
      const ingredientRadio = screen.getByTestId(ingredientRadioId);
      const nomeRadio = screen.getByTestId(nameRadioId);
      const firstLetterRadio = screen.getByTestId(firstLetterId);
      const executeBtn = screen.getByTestId(execButtonId);

      expect(searchInput).toBeInTheDocument();
      expect(ingredientRadio).toBeInTheDocument();
      expect(nomeRadio).toBeInTheDocument();
      expect(firstLetterRadio).toBeInTheDocument();
      expect(executeBtn).toBeInTheDocument();
    });
});

describe('14 - Verifica se a barra está abaixo do header e tem 3 radio buttons', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );
    history.push('/foods');
  });
  it('Se o radio selecionado for Ingredient, a busca na API é feita corretamente',
    async () => {
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);
      const ingredientRadio = screen.getByTestId(ingredientRadioId);
      const executeBtn = screen.getByTestId(execButtonId);
      userEvent.click(ingredientRadio);
      userEvent.click(executeBtn);

      const recipe = await screen.findByText(/bubble & squeak/i);
      expect(recipe).toBeInTheDocument();
    });

  it('Se o radio selecionado for Name, a busca na API é feita corretamente',
    async () => {
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);
      const nameRadio = screen.getByTestId(nameRadioId);
      const executeBtn = screen.getByTestId(execButtonId);
      userEvent.click(nameRadio);
      userEvent.click(executeBtn);

      const recipe = await screen.findByText(/corba/i);
      expect(recipe).toBeInTheDocument();
    });

  it('Se o radio selecionado for First letter, a busca na API é feita corretamente',
    async () => {
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(searchInputId);
      const firstLetterRadio = screen.getByTestId(firstLetterId);
      const executeBtn = screen.getByTestId(execButtonId);

      userEvent.type(searchInput, 'a');
      userEvent.click(firstLetterRadio);
      userEvent.click(executeBtn);

      const recipe = await screen.findByText(/apple frangipan tart/i);
      expect(recipe).toBeInTheDocument();
    });

  it('Deve exibir um alert se First letter for chamado com mais de uma letra', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const searchBtn = screen.getByTestId(profileButton);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId(searchInputId);
    const firstLetterRadio = screen.getByTestId(firstLetterId);
    const executeBtn = screen.getByTestId(execButtonId);

    userEvent.type(searchInput, 'aa');
    userEvent.click(firstLetterRadio);
    userEvent.click(executeBtn);

    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});

describe('15 - Busque na API correta dependendo da página atual', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );
    history.push('/drinks');
  });
  it('Em bebidas, se o radio for Ingredient, API é feita corretamente',
    async () => {
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(searchInputId);
      const ingredientRadio = screen.getByTestId(ingredientRadioId);
      const executeBtn = screen.getByTestId(execButtonId);
      userEvent.type(searchInput, 'lemon');
      userEvent.click(ingredientRadio);
      userEvent.click(executeBtn);

      const recipe = await screen.findByText(/a true amaretto sour/i);
      expect(recipe).toBeInTheDocument();
    });

  it('Em bebidas, se o radio for Name, a busca na API é feita corretamente',
    async () => {
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(searchInputId);
      const nameRadio = screen.getByTestId(nameRadioId);
      const executeBtn = screen.getByTestId(execButtonId);
      userEvent.type(searchInput, 'a');
      userEvent.click(nameRadio);
      userEvent.click(executeBtn);

      const recipe = await screen.findByText(/A1/i);
      expect(recipe).toBeInTheDocument();
    });

  it('Em bebidas, se o radio for First letter, a busca é feita corretamente',
    async () => {
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(searchInputId);
      const firstLetterRadio = screen.getByTestId(firstLetterId);
      const executeBtn = screen.getByTestId(execButtonId);
      userEvent.type(searchInput, 'b');
      userEvent.click(firstLetterRadio);
      userEvent.click(executeBtn);

      const recipe = await screen.findByText(/B-53/i);
      expect(recipe).toBeInTheDocument();
    });

  it('Em bebidas, se o radio for First letter e a busca ter 2 letras+, exiba um alert',
    () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation();
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);
      const searchInput = screen.getByTestId(searchInputId);
      const firstLetterRadio = screen.getByTestId(firstLetterId);
      const executeBtn = screen.getByTestId(execButtonId);
      userEvent.type(searchInput, 'Gim');
      userEvent.click(firstLetterRadio);
      userEvent.click(executeBtn);

      expect(alertMock).toHaveBeenCalledTimes(1);
    });
});

describe('16 - Verifica se vai para a tela de detalhes se tiver apenas 1 receita', () => {
  it('Caso apenas uma comida seja encontrada, deve-se ir para os detalhes',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/foods');
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);
      const nameRadio = screen.getByTestId(nameRadioId);
      const inputSearch = screen.getByTestId(searchInputId);
      const executeBtn = screen.getByTestId(execButtonId);
      userEvent.type(inputSearch, 'corba');
      userEvent.click(nameRadio);
      userEvent.click(executeBtn);

      const recipe = await screen.findByRole('heading', {
        name: /corba/i,
      });
      const share = await screen.findByTestId('share-btn');
      expect(recipe).toBeInTheDocument();
      expect(share).toBeInTheDocument();
    });

  it('Caso apenas uma bebida seja encontrada, deve-se ir para sua rota de detalhes',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/drinks');
      const searchBtn = screen.getByTestId(profileButton);
      userEvent.click(searchBtn);
      const nameRadio = screen.getByTestId(nameRadioId);
      const inputSearch = screen.getByTestId(searchInputId);
      const executeBtn = screen.getByTestId(execButtonId);
      userEvent.type(inputSearch, 'egg cream');
      userEvent.click(nameRadio);
      userEvent.click(executeBtn);

      const recipe = await screen.findByRole('heading', {
        name: /egg cream/i,
      });
      const share = await screen.findByTestId('share-btn');
      expect(recipe).toBeInTheDocument();
      expect(share).toBeInTheDocument();
    });
});
