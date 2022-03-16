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

describe('19 - Verifica os elementos do footer', () => {
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
