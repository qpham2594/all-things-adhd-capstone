import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipePage = () => {
  const [_, setRecipes] = useState([]);

  const recipeList = async () => {
    try {
        const params = {
            ingredients: 'ingredients',
            maxReadyTime: 'maxReadyTime'
          };
        const response = await axios.get('/api/recipes', {params});
        const data = response.data;
        setRecipes(data.id || []);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

  useEffect(() => {
    recipeList();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
};

export default RecipePage;


