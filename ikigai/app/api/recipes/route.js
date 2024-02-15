import axios from 'axios';

export async function recipesSearch(query) {
  try {
    const apiKey = process.env.API_KEY;
    const APILink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;

    const response = await axios.get(APILink);
    const data = response.data;

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

    const response = await axios.get(APILink);
    const data = response.data;

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

    const response = await axios.get(APILink);
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipe by ID');
  }
}

