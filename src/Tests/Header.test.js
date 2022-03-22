import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import App from '../App';
import Foods from '../pages/Foods';

const profileButton = 'profile-top-btn';
const titleName = 'page-title';
const searchButton = 'search-top-btn';

function notHas(history, page) {
  history.push('/foods');
  const profileBtn = screen.getByTestId(profileButton);
  const titleId = screen.getByTestId(titleName);
  const searchBtn = screen.getByTestId(searchButton);
  history.push(page);
  expect(profileBtn).not.toBeInTheDocument();
  expect(titleId).not.toBeInTheDocument();
  expect(searchBtn).not.toBeInTheDocument();
}

function has(history, page, explore) {
  history.push(page);
  const profileBtn = screen.getByTestId(profileButton);
  const titleId = screen.getByTestId(titleName);
  if (explore === true) {
    expect(profileBtn).toBeInTheDocument();
    expect(titleId).toBeInTheDocument();
  } else {
    const searchBtn = screen.getByTestId(searchButton);
    expect(profileBtn).toBeInTheDocument();
    expect(titleId).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  }
}

describe('9 - Verifica os elementos do header na tela principal de receitas', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    renderWithRouter(
      <ApiProvider>
        <Foods />
      </ApiProvider>,
    );

    const profileBtn = screen.getByTestId(profileButton);
    const foodsTitle = screen.getByTestId(titleName);
    const searchBtn = screen.getByTestId(searchButton);

    expect(profileBtn).toBeInTheDocument();
    expect(foodsTitle).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});

describe('10 - Verifica se é renderizado o ícone de profile', () => {
  it('Não tem header na tela de login', () => {
    const { history } = renderWithRouter(<App />);
    notHas(history, '/login');
  });

  it('O header tem os ícones corretos na tela de principal de receitas de comidas',
    () => {
      const { history } = renderWithRouter(<App />);
      has(history, '/foods', false);
    });

  it('O header tem os ícones corretos na tela de principal de receitas de bebidas',
    () => {
      const { history } = renderWithRouter(<App />);
      has(history, '/drinks');
    });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(<App />);
    notHas(history, '/foods/52771');
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(<App />);
    notHas(history, '/drinks/178319');
  });

  it('Não tem header na tela de receita em progresso de comida', () => {
    const { history } = renderWithRouter(<App />);
    notHas(history, '/foods/52771/in-progress');
  });

  it('Não tem header na tela de receita em progresso de bebida', () => {
    const { history } = renderWithRouter(<App />);
    notHas(history, '/drinks/178319/in-progress');
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    const { history } = renderWithRouter(<App />);
    has(history, '/explore', true);
  });

  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    const { history } = renderWithRouter(<App />);
    has(history, '/explore/foods', true);
  });

  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    const { history } = renderWithRouter(<App />);
    has(history, '/explore/drinks', true);
  });

  it('O header tem os ícones corretos na tela de explorar comidas por ingrediente',
    () => {
      const { history } = renderWithRouter(<App />);
      has(history, '/explore/foods/ingredients', true);
    });

  it('O header tem os ícones corretos na tela de explorar bebidas por ingrediente',
    () => {
      const { history } = renderWithRouter(<App />);
      has(history, '/explore/drinks/ingredients', true);
    });

  it('O header tem os ícones corretos na tela de explorar comidas por nacionalidade',
    () => {
      const { history } = renderWithRouter(<App />);
      has(history, '/explore/foods/nationalities', true);
    });
  it('O header tem os ícones corretos na tela de perfil', () => {
    const { history } = renderWithRouter(<App />);
    has(history, '/profile', true);
  });

  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    has(history, '/done-recipes', true);
  });

  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    has(history, '/favorite-recipes', true);
  });
});

describe('11 - Verifica se redireciona a pessoa usuária para a tela de perfil', () => {
  it('A mudança de tela ocorre corretamente', () => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );
    history.push('/foods');

    const profileBtn = screen.getByTestId(profileButton);
    userEvent.click(profileBtn);
    const profileTexet = screen.getByRole('heading', {
      name: /profile/i,
    });
    expect(profileTexet).toBeInTheDocument();
  });
});

describe('12 - Verifica se a barra de busca aparece ao clicar no botão de lupa', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(
      <ApiProvider>
        <App />
      </ApiProvider>,
    );
    history.push('/foods');
  });
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece',
    () => {
      const searchBtn = screen.getByTestId(searchButton);
      userEvent.click(searchBtn);

      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toBeInTheDocument();

      userEvent.click(searchBtn);
      expect(searchInput).not.toBeInTheDocument();
    });

  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    const searchBtn = screen.getByTestId(searchButton);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
