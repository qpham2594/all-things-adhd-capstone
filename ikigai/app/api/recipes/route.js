export async function recipesSearch(query) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&query=${query}`
    );
    if (response.status !== 200) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
}

export async function recipesByTime(maxTime) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&maxReadyTime=${maxTime}`
    );
    if (response.status !== 200) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes by time');
  }
}

export async function recipesByID(id) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    if (response.status !== 200) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipe by ID');
  }
}



