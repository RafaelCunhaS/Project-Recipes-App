import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import ApiProvider from '../context/ApiProvider';
import App from '../App';

const localStorageMock = [{ category: 'Side',
  doneDate: '22/03/2022',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  tags: ['Soup'],
  type: 'food',
},
{ alcoholicOrNot: 'Alcoholic',
  category: 'Cocktail',
  doneDate: '22/03/2022',
  id: '17222',
  image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  name: 'A1',
  tags: [],
  type: 'drink',
}];

describe('Verifica os elementos da tela de done recipes', () => {
  it('Renderiza os elementos corretos',
    async () => {
      localStorage.setItem('doneRecipes', JSON.stringify(localStorageMock));
      const { history } = renderWithRouter(
        <ApiProvider>
          <App />
        </ApiProvider>,
      );
      history.push('/done-recipes');
      const food = await screen.findByText('Corba');
      const drink = await screen.findByText('A1');
      expect(food).toBeInTheDocument();
      expect(drink).toBeInTheDocument();

      const foodFilter = await screen.findByTestId('filter-by-food-btn');
      userEvent.click(foodFilter);
      const food2 = await screen.findByText('Corba');
      expect(food2).toBeInTheDocument();
      expect(drink).not.toBeInTheDocument();

      const drinkFilter = await screen.findByTestId('filter-by-drink-btn');
      userEvent.click(drinkFilter);
      const drink2 = await screen.findByText('A1');
      expect(drink2).toBeInTheDocument();
      expect(food).not.toBeInTheDocument();

      const allFilter = await screen.findByTestId('filter-by-all-btn');
      userEvent.click(allFilter);
      const food3 = await screen.findByText('Corba');
      const drink3 = await screen.findByText('A1');
      expect(food3).toBeInTheDocument();
      expect(drink3).toBeInTheDocument();
    });
});
