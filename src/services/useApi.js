export const apiIngredients = async (path, input) => {
  const URL = `https://www.${path}.com/api/json/v1/1/filter.php?i=${input}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const apiName = async (path, input) => {
  if (input) {
    const URL = `https://www.${path}.com/api/json/v1/1/search.php?s=${input}`;
    const data = await fetch(URL).then((response) => response.json());
    return data;
  }
  const URL = `https://www.${path}.com/api/json/v1/1/search.php?s=`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const apiFirstLetter = async (path, input) => {
  const URL = `https://www.${path}.com/api/json/v1/1/search.php?f=${input}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const getFoodById = async (id) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const apiCategory = async (category) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const getDrinkById = async (id) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const apiCategoryDrinks = async (category) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const apiFilterByAll = async (path) => {
  const URL = `https://www.${path}.com/api/json/v1/1/search.php?s=`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const getRandomFood = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const getRandomDrink = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const getFoodIngredients = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const getDrinkIngredients = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const getNationalities = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const getByArea = async (input) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};
