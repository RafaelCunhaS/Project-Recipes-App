const FAVORITE_RECIPES_KEY = 'favoriteRecipes';
const DONE_RECIPES_KEY = 'doneRecipes';
const IN_PROGRESS_KEY = 'inProgressRecipes';
const USER_KEY = 'user';

export const readFavorites = () => JSON.parse(localStorage.getItem(FAVORITE_RECIPES_KEY));

const readDoneRecipes = () => JSON.parse(localStorage.getItem(DONE_RECIPES_KEY));

const readInProgress = () => JSON.parse(localStorage.getItem(IN_PROGRESS_KEY));

export const readEmail = () => JSON.parse(localStorage.getItem(USER_KEY));

const saveFavorites = (favorite) => localStorage
  .setItem(FAVORITE_RECIPES_KEY, JSON.stringify(favorite));

if (!readFavorites()) {
  localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify([]));
}

if (!readDoneRecipes()) {
  localStorage.setItem(DONE_RECIPES_KEY, JSON.stringify([]));
}

export const checkDoneRecipes = (id) => {
  const doneRecipes = readDoneRecipes();
  return doneRecipes.some((recipe) => recipe.id === id);
};

export const checkInProgress = (id) => {
  if (readInProgress()) {
    const inProgress = readInProgress();
    return Object.values(inProgress).some((obj) => obj[id]);
  }
};

export const checkFavorites = (id) => {
  const favorites = readFavorites();
  return favorites.some((recipe) => recipe.id === id);
};

export const addFavorite = (obj) => {
  const favorites = readFavorites();
  favorites.push(obj);
  saveFavorites(favorites);
};

export const removeFavorite = (id) => {
  if (id) {
    const favorites = readFavorites();
    favorites.splice(favorites.findIndex((recipe) => recipe.id === id), 1);
    saveFavorites(favorites);
  }
};

export const addDrinkDetailsInProgress = (id, drinks) => {
  if ('inProgressRecipes' in localStorage) {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { cocktails: { ...progressRecipes.cocktails, [id]: drinks[0] },
        meals: { ...progressRecipes.meals } },
    ));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { cocktails: { [id]: drinks[0] }, meals: {} },
    ));
  }
};

export const addFoodIngredients = (id, ingredients) => {
  if ('inProgressRecipes' in localStorage) {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const teste = [...progressRecipes.meals[id], ingredients];
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { cocktails: { ...progressRecipes.cocktails },
        meals: { [id]: teste } },
    ));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { meals: { [id]: [ingredients] }, cocktails: {} },
    ));
  }
};

export const removeFoodIngredients = (id, ingredients) => {
  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const teste = progressRecipes.meals[id].filter((e) => e !== ingredients);
  localStorage.setItem('inProgressRecipes', JSON.stringify(
    { cocktails: { ...progressRecipes.cocktails },
      meals: { [id]: teste } },
  ));
};

export const addDrinkIngredients = (id, ingredients) => {
  if ('inProgressRecipes' in localStorage) {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const teste = [...progressRecipes.cocktails[id], ingredients];
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { meals: { ...progressRecipes.meals },
        cocktails: { [id]: teste } },
    ));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { cocktails: { [id]: [ingredients] }, meals: {} },
    ));
  }
};

export const removeDrinkIngredients = (id, ingredients) => {
  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const teste = progressRecipes.cocktails[id].filter((e) => e !== ingredients);
  localStorage.setItem('inProgressRecipes', JSON.stringify(
    { meals: { ...progressRecipes.meals },
      cocktails: { [id]: teste } },
  ));
};

export const addDoneRecipe = (obj) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, obj]));
};
