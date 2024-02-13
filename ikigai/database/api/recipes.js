import axios from 'axios';

export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_KEY;

    const ingredients = req.query.ingredients; // Extract ingredients from the request query
    const maxTime = req.query.maxReadyTime; // Extract maxTime from the request query

    const APILink = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&maxReadyTime=${maxTime}`;

    const response = await axios.get(APILink);
    const data = response.data;
    console.log(data)

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

  
  
