import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import App from '../App';

const localStorageMock = [{ alcoholicOrNot: '',
  category: 'Side',
  id: '53060',
  image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  name: 'Burek',
  nationality: 'Croatian',
  type: 'food',
},
{ alcoholicOrNot: 'Alcoholic',
  category: 'Cocktail',
  id: '17222',
  image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  name: 'A1',
  nationality: '',
  type: 'drink',
}];

describe('Verifica os elementos daa tela de favorite recipes', () => {
  it('Renderiza os elementos corretos caso o usuário vá a página de drinks em progresso',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageMock));
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/favorite-recipes');
      const food = await screen.findByText('Burek');
      const drink = await screen.findByText('A1');
      expect(food).toBeInTheDocument();
      expect(drink).toBeInTheDocument();

      const foodFilter = await screen.findByTestId('filter-by-food-btn');
      userEvent.click(foodFilter);
      const food2 = await screen.findByText('Burek');
      expect(food2).toBeInTheDocument();
      expect(drink).not.toBeInTheDocument();

      const drinkFilter = await screen.findByTestId('filter-by-drink-btn');
      userEvent.click(drinkFilter);
      const drink2 = await screen.findByText('A1');
      expect(drink2).toBeInTheDocument();
      expect(food).not.toBeInTheDocument();

      const allFilter = await screen.findByTestId('filter-by-all-btn');
      userEvent.click(allFilter);
      const food3 = await screen.findByText('Burek');
      const drink3 = await screen.findByText('A1');
      expect(food3).toBeInTheDocument();
      expect(drink3).toBeInTheDocument();

      const favoriteBtn = await screen.findByTestId('0-horizontal-favorite-btn');
      userEvent.click(favoriteBtn);
      const drink4 = await screen.findByText('A1');
      expect(drink4).toBeInTheDocument();
      expect(food).not.toBeInTheDocument();
    });
});
