import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import App from '../App';

function notHas(history, page) {
  history.push('/foods');
  const profileBtn = screen.getByTestId('profile-top-btn');
  const titleId = screen.getByTestId('page-title');
  const searchBtn = screen.getByTestId('search-top-btn');
  history.push(page);
  expect(profileBtn).not.toBeInTheDocument();
  expect(titleId).not.toBeInTheDocument();
  expect(searchBtn).not.toBeInTheDocument();
}

function has(history, page, explore) {
  history.push(page);
  const profileBtn = screen.getByTestId('profile-top-btn');
  const titleId = screen.getByTestId('page-title');
  if (explore === true) {
    expect(profileBtn).toBeInTheDocument();
    expect(titleId).toBeInTheDocument();
  } else {
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(profileBtn).toBeInTheDocument();
    expect(titleId).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  }
}

describe('10 - Testa se é renderizado o ícone de profile', () => {
  it('Não tem header na tela de login', () => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );
    notHas(history, '/login');
  });

  it('O header tem os ícones corretos na tela de principal de receitas de comidas',
    () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );

      has(history, '/foods', false);
    });

  it('O header tem os ícones corretos na tela de principal de receitas de bebidas',
    () => {
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );

      has(history, '/drinks');
    });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );

    notHas(history, '/foods/52771');
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );

    notHas(history, '/drinks/178319');
  });

  it('Não tem header na tela de receita em progresso de comida', () => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );

    notHas(history, '/foods/52771/in-progress');
  });

  it('Não tem header na tela de receita em progresso de bebida', () => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );

    notHas(history, '/drinks/178319/in-progress');
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );

    has(history, '/explore', true);
  });
});
