export const apiIngredients = async (path, input) => {
  const URL = `https://www.${path}.com/api/json/v1/1/filter.php?i=${input}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const apiName = async (path, input) => {
  const URL = `https://www.${path}.com/api/json/v1/1/search.php?s=${input}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const apiFirstLetter = async (path, input) => {
  const URL = `https://www.${path}.com/api/json/v1/1/search.php?f=${input}`;
  const data = await fetch(URL).then((response) => response.json());
  return data;
};

export const apiCategory = async (category) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
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
