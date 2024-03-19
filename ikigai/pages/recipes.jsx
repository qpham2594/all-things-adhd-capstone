import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { recipesSearch, recipesByTime } from '../app/api/recipes/route';

function RecipeSearchPage() {
  const [query, setQuery] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [searchType, setSearchType] = useState('query');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    try {
      let data;
      if (searchType === 'query') {
        data = await recipesSearch(query);
      } else if (searchType === 'time') {
        data = await recipesByTime(maxTime);
      }
      setResults(data.results);
    } catch (error) {
      console.error('Error searching for recipes:', error);
    }
  };

  const handleRecipeClick = (id) => {
    router.push(`/recipe/${id}`);
  };

  return (
    <div>
      <h1>Recipe Search</h1>
      <div>
        <label>
          Search by:
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="query">Ingredients</option>
            <option value="time">Max Time</option>
          </select>
        </label>
        {searchType === 'query' ? (
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        ) : (
          <input type="number" value={maxTime} onChange={(e) => setMaxTime(e.target.value)} placeholder="Max Time (minutes)" />
        )}
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Results</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((recipe) => (
              <li key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>
                <img src={recipe.image} alt={recipe.title} />
                <div>
                  <h3>{recipe.title}</h3>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default RecipeSearchPage;

