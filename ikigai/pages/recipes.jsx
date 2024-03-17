import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { recipesSearch, recipesByTime } from '../app/api/recipes/route';

const RecipePage = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleGeneralSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const allRecipes = await recipesSearch(query);
      console.log('General Search Results:', allRecipes);
      setSearchResults(allRecipes);
    } catch (error) {
      console.error('Error in general search:', error);
    }
  };

  const handleTimedSearch = async (e) => {
    e.preventDefault();
    if (!maxReadyTime.trim()) return;

    try {
      const quickRecipes = await recipesByTime(maxReadyTime);
      console.log('Timed Search Results:', quickRecipes);
      setSearchResults(quickRecipes);
    } catch (error) {
      console.error('Error in timed search:', error);
    }
  };

  const handleRecipeClick = (recipeId) => {
    router.push(`/recipes/${recipeId}`);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <>
        <form onSubmit={handleGeneralSearch}>
          <label>
            Search for Recipes:
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <button type="submit">Search</button>
        </form>

        <form onSubmit={handleTimedSearch}>
          <label>
            Search Recipes by Time:
            <input type="number" value={maxReadyTime} onChange={(e) => setMaxReadyTime(e.target.value)} />
          </label>
          <button type="submit">Search by Time</button>
        </form>

        {searchResults.length > 0 && (
          <div>
            <h2> Search Results: </h2>
            <ul>
              {searchResults.map((recipe) => (
                <li key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>
                  {recipe.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    </div>
  );
};

export default RecipePage;



