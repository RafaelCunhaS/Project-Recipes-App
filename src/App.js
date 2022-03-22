import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Foods from './pages/Foods';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import DrinkDetailsInProgress from './pages/DrinkDetailsInProgress';
import FoodDetailsInProgress from './pages/FoodDetailsInProgress';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import ExploreDrinksNationalities from './pages/ExploreDrinksNationalities';
import ApiProvider from './context/ApiProvider';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <ApiProvider>
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/foods/:id" component={ FoodDetails } />
        <Route exact path="/foods/:id/in-progress" component={ FoodDetailsInProgress } />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ DrinkDetailsInProgress }
        />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreFoodsIngredients }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNationalities }
        />
        <Route
          exact
          path="/explore/drinks/nationalities"
          component={ ExploreDrinksNationalities }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </ApiProvider>
    </Switch>
  );
}

export default App;
