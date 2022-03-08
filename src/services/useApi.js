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
