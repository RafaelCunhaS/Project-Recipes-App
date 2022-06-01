import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import Foods from '../pages/Foods';
import App from '../App';

const drinkFooterId = 'drinks-bottom-btn';
const exploreFooterId = 'explore-bottom-btn';
const foodFooterId = 'food-bottom-btn';

describe('Verifica os elementos do footer', () => {
  it('Tem os data-testids drinks-bottom-btn, explore-bottom-btn e food-bottom-btn',
    () => {
      renderWithRouter(
        <ApiProvider>
          <Foods />
        </ApiProvider>,
      );
      const drinkFooter = screen.getByTestId(drinkFooterId);
      const exploreFooter = screen.getByTestId(exploreFooterId);
      const foodFooter = screen.getByTestId(foodFooterId);

      expect(drinkFooter).toBeInTheDocument();
      expect(exploreFooter).toBeInTheDocument();
      expect(foodFooter).toBeInTheDocument();
    });
  it('Renderiza a página drinks ao clicar no ícone de bebida',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/foods');
      const drinksBtn = await screen.findByTestId(drinkFooterId);
      userEvent.click(drinksBtn);

      const page = await screen.findByText('Drinks');
      expect(page).toBeInTheDocument();
    });
  it('Renderiza a página foods ao clicar no ícone de comida',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/drinks');
      const drinksBtn = await screen.findByTestId(foodFooterId);
      userEvent.click(drinksBtn);

      const page = await screen.findByText('Foods');
      expect(page).toBeInTheDocument();
    });
  it('Renderiza a página explore ao clicar no ícone de bússola',
    async () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/drinks');
      const drinksBtn = await screen.findByTestId(exploreFooterId);
      userEvent.click(drinksBtn);

      const page = await screen.findByText('Explore');
      expect(page).toBeInTheDocument();
    });
});

describe('20 - Apresente 3 ícones: comidas, bebidas e exploração', () => {
  it('O menu inferior deve ficar fixado sempre ao final da página', () => {
    renderWithRouter(
      <ApiProvider>
        <Foods />
      </ApiProvider>,
    );
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveStyle('display: block');
  });

  it('Apresenta os ícones corretos', () => {
    renderWithRouter(
      <ApiProvider>
        <Foods />
      </ApiProvider>,
    );
    const drinkFooter = screen.getByTestId(drinkFooterId);
    const exploreFooter = screen.getByTestId(exploreFooterId);
    const foodFooter = screen.getByTestId(foodFooterId);

    expect(drinkFooter).toBeInTheDocument();
    expect(exploreFooter).toBeInTheDocument();
    expect(foodFooter).toBeInTheDocument();
  });
});
