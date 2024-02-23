const fetchRecipeData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
};

export async function recipesSearch(query) {
  try {
    const apiKey = process.env.API_KEY;
    const APILink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
    const data = await fetchRecipeData(APILink);

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
}

export async function recipesByTime(maxTime) {
  try {
    const apiKey = process.env.API_KEY;
    const APILink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&maxReadyTime=${maxTime}`;
    const data = await fetchRecipeData(APILink);

    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes by time');
  }
}

export async function recipesByID(id) {
  try {
    const apiKey = process.env.API_KEY;
    const APILink = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    const data = await fetchRecipeData(APILink);

    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipe by ID');
  }
}


