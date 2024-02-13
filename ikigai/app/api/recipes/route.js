import axios from 'axios';

export async function recipesSearch(query) {
  try {
    const apiKey = process.env.API_KEY;

    const APILink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;

    const response = await axios.get(APILink);
    const data = response.data;
    console.log(data)

    return data
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function recipesByTime(maxTime) {
    try {
      const apiKey = process.env.API_KEY;
  
      const APILink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&maxReadyTime=${maxTime}`;
  
      const response = await axios.get(APILink);
      const data = response.data;
      return data

    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


export async function recipesByID(recipeId) {
    try {
      const apiKey = process.env.API_KEY;
  
      const APILink = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
  
      const response = await axios.get(APILink);
      const data = response.data;
      return data

    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
